import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://ojsldbkf:zg5GNLVjyyw13m144KJ4v6X_JgJ95Hul@crow.rmq.cloudamqp.com/ojsldbkf' 
          ],
  
          queue: 'main_products_queue',
          queueOptions: {
            durable: false
          }
        }
      }
    ])
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}