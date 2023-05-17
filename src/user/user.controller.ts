import {
  Body,
  Controller,
  Post,
  Get,
  Response,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Tokens } from './types/tokens.type';
import { CreateUserDto } from './user.dto/user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('reg')
  getSignup(@Request() req, @Response() res) {
    res.render('reg');
  }

  @Post('/reg')
  reg(@Body() createUserDto: CreateUserDto): Promise<Tokens> {
    return this.userService.reg(createUserDto);
  }
  @Get('login')
  getSignin(@Request() req, @Response() res) {
    res.render('login');
  }

  // @HttpCode(HttpStatus.OK)
  // @Post('/signin')
  // signin(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.signin(createUserDto);
  // }
  @Get('/dashboard')
  getdarshboard(@Request() req, @Response() res) {
    res.render('dashboard');
  }
}
