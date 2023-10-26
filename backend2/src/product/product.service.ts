import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './schemas/product.schema';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    return new this.productModel(createProductDto).save();
  }

  findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  findOne(id: number): Promise<Product> {
    return this.productModel.findOne({ id }).exec();
  }

  update(id: number, UpdateData: any) {
    return this.productModel.findOneAndUpdate({ id }, UpdateData, { new: true });
  }

  remove(id: number) {
    return this.productModel.deleteOne({ id });
  }
}