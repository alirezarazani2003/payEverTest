import { IsNotEmpty } from 'class-validator';

export class CreateUsersDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  job: string;
}
