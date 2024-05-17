import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';
import { RabbitmqModule } from 'src/rabbitmq/rabbitmq.module';

@Module({
  imports: [ConfigModule.forRoot(), RabbitmqModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, RabbitmqService],
})
export class UsersModule {}
