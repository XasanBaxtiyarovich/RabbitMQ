import { Controller, Get, Post, Body, Param, Delete, Put, Inject, NotFoundException } from '@nestjs/common';

import { ProductService } from './product.service';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto, UpdateProductDto } from './dto';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy  
  ) {}

  @Post('create')
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);
    
    this.client.emit('product_created', product);
    return product;
  }

  @Get('find-all')
  findAll() {
    this.client.emit('hello', 'Hello from another server');
    return this.productService.findAll();
  }

  @Get('find-one/:id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Put('update-one/:id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const proudct = await this.productService.update(+id, updateProductDto);

    this.client.emit('product_updated', proudct)

    return proudct;
  }

  @Delete('delete-one/:id')
  remove(@Param('id') id: string) {
    this.client.emit('product_deleted', +id);

    return this.productService.remove(+id);
  }

  @Post(':id/like')
  async likeBoss(@Param('id') id: string) {
    let product = await this.productService.findOne(+id)
    if (!product) throw new NotFoundException('PRODUCT NOT FOUND');

    return this.productService.update(+id, {likes: product.likes+1})
  }
}
