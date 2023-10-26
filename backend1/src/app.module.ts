import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';


@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: '.env', 
        isGlobal: true 
      }
    ),
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'Qwerty!2345',
        database: 'products',
        entities: [ Product ],
        synchronize: true,
      }
    ),
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
