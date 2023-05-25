import {
  Body,
  Controller,
  Post,
  Get,
  Response,
  Request,
  Render,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto/user.dto';
import { ProductsService } from './product.service';

@Controller('/auth')
export class ProductController {
  constructor(private productService: ProductsService) {}

  @Post('product')
  @Render('product')
  createProduct(
    @Request() req,
    @Response() res,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.productService.createProduct(createUserDto, req, res);
  }

  //   @Get('/product')
  //   //   @Render('product')
  //   async showTable() {
  //     const data = await this.productService.getproduct();
  //     return { data };
  //   }
}
