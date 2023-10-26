import { HttpService } from '@nestjs/axios';
import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException } from '@nestjs/common';

import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly httpService: HttpService
  ) {}

  @Post('create')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Post(':id/like')
  async likeBoss(@Param('id') id: string) {
    let product = await this.productService.findOne(+id)
    if (!product) throw new NotFoundException('PRODUCT NOT FOUND');

    product = await this.productService.update(+id, {likes: product.likes+1})

    try {
      this.httpService
       .post(`http://localhost:3000/api/product/${id}/like`, {})
       .subscribe((res) => {
        console.log(res);
       })
    } catch (error) {
      console.log(error);
    }
    return product;
  }

  @Get("find-all") 
  findAll() { 
    return this.productService.findAll();
  }

  @Get('find-one/:id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Put('update-one')
  update(@Body() updateProductDto: UpdateProductDto) {
    const {id, ...UpdateData} = updateProductDto
    return this.productService.update(id, UpdateData);
  }

  @Delete('delete-one/:id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
