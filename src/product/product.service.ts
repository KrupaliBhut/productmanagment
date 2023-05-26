import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CategoriesController } from 'src/categories/categories.controller';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
const prisma = new PrismaClient();
@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const { cname, name, description, price } = createProductDto;
    console.log('hi');

    const dataenter = await this.prismaService.product.create({
      data: {
        price,
        description,
        name,
        // categories: {
        //   create: [
        //     {
        //       category: {
        //         create: {
        //           cname,
        //         },
        //       },
        //     },
        //   ],
        // },
      },
      include: {
        categories: true,
      },
    });
    return dataenter;
  }

  async findAll(): Promise<any> {
    try {
      return await this.prismaService.product.findMany({});
    } catch (err) {
      throw err;
    }
    // return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    return await this.prismaService.user.delete({ where: { id } });

    // return this.prismaService.product.delete({id})
    // return `This action removes a #${id} product`;
  }
  async getproduct() {
    const productdata = await prisma.product.findMany();
    return productdata;
  }
}
