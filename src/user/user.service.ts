import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
const prisma = new PrismaClient();
// import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './user.dto/user.dto';
// import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async signup(createUserDto: CreateUserDto) {
    const {
      name,
      email,
      password,
      created_at,
      updated_at,
      userId,
      roleId,
      assignedBy,
    } = createUserDto;
    await prisma.user.create({
      data: {
        name,
        email,
        password,
        created_at,
        updated_at,
        Users_has_roles: {
          create: [
            {
              roleId,
              assignedBy,
            },
          ],
        },
      },
    });
  }
}
