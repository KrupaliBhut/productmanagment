import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { UserController } from './user/user.controller';
// import { HomeController } from '../src/user/home.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
// import { HomeController } from './user/home.controller';
import { UserModule } from './user/user.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    ProductModule,
    CategoriesModule,
    ProductModule,
  ],
  controllers: [],
  // controllers: [HomeController],
  providers: [AppService],
})
export class AppModule {}
