import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [UsersModule, RabbitmqModule],
})
export class AppModule {}
