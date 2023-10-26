import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductMicroServiceController } from './product-microservice copy';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Product.name, schema: ProductSchema }
      ]
    ),
    HttpModule
  ],
  controllers: [ProductController, ProductMicroServiceController],
  providers: [ProductService],
})
export class ProductModule {}