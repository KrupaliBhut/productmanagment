import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto/user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  createProduct(createUserDto: CreateUserDto, req: any, res: any) {
      throw new Error('Method not implemented.');
  }
  constructor(private prismaService: PrismaService){}

  async create(createProductDto: CreateProductDto) {

    try{
      const { cname, name, description, price } = createProductDto;

      return await this.prismaService.product.create({data:{
        price,
        description,
        name,
        categories: {
          create:[
            {
              category:{
                create:{
                  cname
                
                }
              }
            },
          
          ],
          
        },
    },
      include: {
      categories:true
    },
}})
}catch(err){
    throw err;
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
}
