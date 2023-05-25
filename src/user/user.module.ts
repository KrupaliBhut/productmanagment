import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AtStrategy } from './strategies/at.strategy';
import { RtStrategy } from './strategies/rt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from 'src/google.strategy';
@Module({
  imports: [JwtModule],
  controllers: [UserController],
  providers: [UserService, PrismaService, GoogleStrategy],
})
export class UserModule {}
