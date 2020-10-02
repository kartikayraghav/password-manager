import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(User) private readonly USER: Repository<User>,
  ) { }

  //Add New User.
  async add(user: User): Promise<User> {
    const newUser = this.USER.create(user);
    return await newUser.save();
  }

  //Find Single User.
  async findOne(username: string): Promise<User> {
    return await this.USER.findOne({ username });
  }


}
