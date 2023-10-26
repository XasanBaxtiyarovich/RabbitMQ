import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
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
  );
  app.listen();
}
bootstrap();
