import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { UserController } from './user/user.controller';
// import { HomeController } from '../src/user/home.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
// import { HomeController } from './user/home.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [],
  // controllers: [HomeController],
  providers: [AppService],
})
export class AppModule {}
