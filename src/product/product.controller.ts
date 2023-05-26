import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
} from '@nestjs/common';
import { ProductsService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

// @Controller('/auth')
// export class ProductController {
//   constructor(private productService: ProductsService) {}

//   @Post('product')
//   @Render('product')
//   createProduct(
//     @Request() req,
//     @Response() res,
//     @Body() createUserDto: CreateUserDto,
//   ) {
//     return this.productService.createProduct(createUserDto, req, res);
//   }

//   @Get('/product')
//   //   @Render('product')
//   async showTable() {
//     const data = await this.productService.getproduct();
//     return { data };
//   }
// }
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Post('/products')
  // create(@Body() createProductDto: CreateProductDto) {
  //   return this.productsService.create(createProductDto);
  // }
  @Post()
  @Render('createProduct')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // @Get()
  // @Render('product')
  // findAll() {
  //   return this.productsService.findAll();
  // }
  @Get()
  @Render('product')
  async showTable() {
    const data = await this.productsService.getproduct();
    return { data };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @Render('deleteProduct')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
