import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('user')
  addUser(@Body() { username, password }) {

    return { status: 'Account Created' };
  }

}
