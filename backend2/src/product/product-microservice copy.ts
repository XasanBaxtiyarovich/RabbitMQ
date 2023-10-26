import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';

import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { UpdateProductDto } from './dto';

@Controller('product')
export class ProductMicroServiceController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('hello')
  async hello(data: string) {
    console.log(data);
  }

  @EventPattern('product_created')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto)
  }

  @EventPattern('product_updated')
  update(@Body() updateProductDto: UpdateProductDto) {
    const {id, ...updateData} = updateProductDto;
    return this.productService.update(+id, updateData);
  }

  @EventPattern('product_deleted')
  remove(id: string){
    return this.productService.remove(+id);
  }
}
