import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { User, UserI } from 'db/models/users.entity';
import axios from 'axios';
import { IdUserResponse } from './interfaces/getByIdResponse.interface';
import { downloadAvatar } from 'utils/getAvatar';
import { deleteAvatarFile } from 'utils/deleteAvatarFile';

@Injectable()
export class UsersRepository {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async createUser(createUsersDto: CreateUsersDto): Promise<CreateUsersDto> {
    const { name, job } = createUsersDto;

    const found = await User.findOne({ name });
    const userLength = await User.find();

    if (found) {
      // Just for me to know if already exists in my db
      console.error('user already exists');
    }

    const userObj: UserI = {
      id: userLength.length + 1,
      name,
      job,
    };

    const user = new User(userObj);
    await user.save();
    axios.post('https://reqres.in/api/users', user);

    return user;
  }

  async getUserById(id: string): Promise<IdUserResponse> {
    const found: Promise<IdUserResponse> = axios
      .get(`https://reqres.in/api/users/${id}`)
      .then((result) => {
        if (!result) {
          throw new NotFoundException();
        }
        return result.data.data;
      })
      .catch((error) => console.error(error));

    return found;
  }

  async getUserAvatar(id: string): Promise<string | void> {
    const dbFound = await User.findOne({ id });

    if (dbFound.avatar) {
      return `Avatar retirieved from data base: ${dbFound.avatar};`;
    }

    const axiosFound = (await axios.get(`https://reqres.in/api/users/${id}`))
      .data.data.avatar;
    const filename = `avatars/${id}avatar.json`;
    const base64Avatar = downloadAvatar(axiosFound, filename, id);
    const base64AvatarString = (await base64Avatar).toString();

    await User.findOneAndUpdate({ id }, { avatar: base64AvatarString });

    return base64Avatar;
  }

  async deleteAvatar(id: string): Promise<string> {
    const found = await User.findOne({ id });
    if (found.avatar) {
      found.avatar = undefined;
      found.save();
      deleteAvatarFile('avatars/', `${id}avatar.json`);
      return `${found.name}'s avatar removed.`;
    } else {
      return `${found.name} has no avatar.`;
    }
  }
}
