import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './users.service';
import { UserDto, UserRegistration } from './validation';
import config from '../config';
const jwt = require('jsonwebtoken');

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Post('register')
  async register(@Body() body: UserRegistration, @Req() req) {
    const user = await this.service.create(body);

    return { user };
  }

  @Post('login')
  async login(@Body() body: UserDto, @Req() req) {
    const email = body.email;
    const password = body.password;

    const users = await this.service.filter({ email, password });

    if (users.length == 1) {
      let user = users[0];
      const token = jwt.sign(JSON.stringify(user), config.jwtSecrete);

      return {
        email: user.email,
        token,
      };
    } else {
      throw new HttpException(
        { message: ['Invalid Credentials'] },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
