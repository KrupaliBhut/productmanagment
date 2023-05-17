import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
const prisma = new PrismaClient();
import { CreateUserDto } from './user.dto/user.dto';
import * as bcrypt from 'bcrypt';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { userInfo } from 'os';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Tokens } from './types/tokens.type';
@Injectable()
export class UserService {
  prisma: any;
  constructor(private readonly prismaService: PrismaService) {}
  private jwtService: JwtService;

  async reg(createUserDto: CreateUserDto): Promise<Tokens> {
    const hash = await this.hashData(createUserDto.password);
    const {
      name,
      email,
      password,
      // userId,
      // roleId,
      // assignedBy,
    } = createUserDto;
    // save the new user in the db
    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password,
      },
    });
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async updateRtHash(userId: number, rt: string) {
    const hash = await this.hashData(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }
  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
  async getTokens(userId: number, email: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
