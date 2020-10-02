import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Credential } from './entities/credential.entity';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(User) private readonly USER: Repository<User>,
    @InjectRepository(Credential) private readonly CREDENTIAL: Repository<Credential>,
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

  //Add New Credential.
  async addCredential(credential: Credential): Promise<Credential> {
    const newCredential = this.CREDENTIAL.create(credential);
    return await newCredential.save();
  }

  //Get Credentials For a User.
  async getCredentials(user): Promise<any> {
    return await this.CREDENTIAL.find({ user });
  }



}
