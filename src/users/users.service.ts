import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUsersDto } from './dto/create-users.dto';
import { IdUserResponse } from './interfaces/getByIdResponse.interface';
import { AxiosResponse } from 'axios';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  createUser(createUsersDto: CreateUsersDto): Promise<CreateUsersDto> {
    return this.usersRepository.createUser(createUsersDto);
  }

  getUserById(id: string): Promise<IdUserResponse> {
    return this.usersRepository.getUserById(id);
  }

  getUserAvatar(id: string): Promise<string | void | AxiosResponse<any, any>> {
    return this.usersRepository.getUserAvatar(id);
  }

  deleteAvatar(id: string): Promise<string> {
    return this.usersRepository.deleteAvatar(id);
  }
}
