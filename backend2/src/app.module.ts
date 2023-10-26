import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
         envFilePath: '.env', isGlobal: true 
      }
    ),
    MongooseModule.forRoot(
      process.env.MONGO_URI /*|| 'mongodb+srv://xasan777:88xasan175@cluster0.3fgytu3.mongodb.net/products'*/,
      {
        autoCreate: true
      }
    ),
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
