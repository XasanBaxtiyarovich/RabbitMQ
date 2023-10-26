import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private readonly productRepo: Repository<Product>) {}

  create(createProductDto: CreateProductDto) {
    return this.productRepo.save(createProductDto);
  }

  findAll() {
    return this.productRepo.find();
  }

  async findOne(id: number) {

    const product = await this.productRepo.findOneBy({ id });
    if (!product) throw new NotFoundException('PRODUCT NOT FOUND');

    return product;
  }

  async update(id: number, updateProductDto: any) {

    const product = await this.productRepo.findOneBy({ id });
    if (!product) throw new NotFoundException('PRODUCT NOT FOUND');

    await this.productRepo.update({ id }, updateProductDto);

    const updateProduct = await this.productRepo.findOneBy({ id });    

    return updateProduct;
  }

  async remove(id: number) {

    const product = await this.productRepo.findOneBy({ id });
    if (!product) throw new NotFoundException('PRODUCT NOT FOUND');

    return this.productRepo.delete({ id });
  }
}
