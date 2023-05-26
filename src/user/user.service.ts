

import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './user.dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { userInfo } from 'os';
import { Tokens } from './types';
import { jwtSecret } from 'src/utils/constants';
import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();
@Injectable()
export class UserService {
  // hashPassword: any;
  jwtService: any;
  prisma: any;
  constructor(private prismaService: PrismaService, private jwt: JwtService) {}

  async Register(createUserDto: CreateUserDto, req: Request, res: Response) {
    try {
      console.log(createUserDto);
      const { email, password } = createUserDto;
      const findUser = await prisma.user.findUnique({
        where: { email },
      });

      if (findUser) {
        throw new BadRequestException('Email already registered');
      }

      const hashedPassword = await this.hashPassword(password);

      await this.prisma.user.create({
        data: {
          email,
          hashedPassword,
        },
      });

      res.redirect('/login');
    } catch (err) {
      throw err;
    }
  }

  async Login(createUserDto: CreateUserDto, req: Request, res: Response) {
    try {
      const { email, password } = createUserDto;
      const findUser = await prisma.user.findUnique({
        where: { email },
      });
      console.log('finduser');

      if (!findUser) {
        throw new BadRequestException('Wrong credentials');
      }

      const isMatch = this.camparePassword({
        password,
        hash: findUser.hashedPassword,
      });

      const token = await this.setToken({
        userId: findUser.id,
        email: findUser.email,
      });

      if (!token) {
        throw new ForbiddenException('Counld not signin');
      }
      res.cookie('token', token, {});

      // if (findUser.roles === 'Admin') {
      //   res.render('admin');
      // } else {
      //   res.render('user');
      // }
    } catch (err) {
      throw err;
    }
  }
  async Logout(req: Request, res: Response) {
    try {
      res.clearCookie('token');
      return res.send({ message: 'Logout successful' });
    } catch (err) {
      throw err;
    }
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltOrRounds);
    return hashPassword;
  }

  async camparePassword(args: { hash: string; password: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }

  async setToken(args: { userId: string; email: string }) {
    const payload = args;

    const token = this.jwt.signAsync(payload, { secret: jwtSecret });
    return token;
  }

  async googleAuth(req, res) {
    if (!req.user) {
      return 'no user from google';
    }

    // const {email, password} = dto;
    // const findUser = await this.prisma.user.findUnique({
    //     where:{email}
    // })
    // return{
    //     message: "user info from google"
    // }
    // if(findUser.roles === 'User'){
    //     res.render('user')
    // }else{
    //     res.render('admin')
    // }
    console.log('user', req.user);
    res.render('admin');
  }

  async getuser() {
    const tabledata = await prisma.user.findMany();
    return tabledata;
  }
}
