import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductController } from './product.controller';
import { ProductsService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductsService, PrismaService],
})
export class ProductModule {}
