import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('user')
  async addUser(@Body() user) {
    //Check if User Already Exists.
    let _user = await this.appService.findOne(user.username);
    if (_user) return { status: 'User Already exists.' };

    user = await this.appService.add(user);
    return { status: 'Account Created' };
  }

  @Post('user/auth')
  async signin(@Body() { username, password }) {
    //Check if User Already Exists.
    let user = await this.appService.findOne(username);
    if (!user) return { status: 'User Does not exist.' };

    //Verify Password.
    if (password !== user.password) return { status: 'Incorrect Credentials.' }

    return { status: 'Success', userId: user.id };
  }

}
