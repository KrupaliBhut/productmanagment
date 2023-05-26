import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
const prisma = new PrismaClient();
@Injectable()
export class CategoriesService {
  constructor(private prismaService: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    return this.prismaService.category.create({ data: createCategoryDto });
    // return 'This action adds a new category';
  }

  findAll() {
    return this.prismaService.category.findMany({
      include: {
        products: true,
      },
    });
    // return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
  async getcategory() {
    const categorydata = await prisma.category.findMany();
    return categorydata;
  }
}
