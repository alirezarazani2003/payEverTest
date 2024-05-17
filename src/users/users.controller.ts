import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';
import { IdUserResponse } from './interfaces/getByIdResponse.interface';
import { AxiosResponse } from 'axios';

@Controller('api/users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private rabbitMqService: RabbitmqService,
  ) {}

  @Post()
  async createUser(@Body() createUsersDto: CreateUsersDto) {
    this.rabbitMqService.connection();
    return this.usersService.createUser(createUsersDto);
  }

  @Get(':id')
  async getUsersById(@Param('id') id: string): Promise<IdUserResponse> {
    return this.usersService.getUserById(id);
  }

  @Get(':id/avatar')
  async getUserAvatar(
    @Param('id') id: string,
  ): Promise<string | void | AxiosResponse<any, any>> {
    return this.usersService.getUserAvatar(id);
  }

  @Delete(':id/avatar')
  async deleteAvatar(@Param('id') id: string): Promise<string> {
    return this.usersService.deleteAvatar(id);
  }
}
