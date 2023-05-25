import {
  Body,
  Controller,
  Post,
  Get,
  Response,
  Request,
  HttpCode,
  HttpStatus,
  Render,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Tokens } from './types/tokens.type';
import { CreateUserDto } from './user.dto/user.dto';
import { UserService } from './user.service';

@Controller('/auth')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth(@Request() req) {}

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Request() req, @Response() res) {
    return this.userService.googleAuth(req, res);
  }

  @Get('/register')
  @Render('reg')
  RegisterPage() {
    return { message: 'page rendered' };
  }
  @Get('/login')
  @Render('login')
  LoginPage() {
    return { message: 'login page rendered' };
  }
  @Get('/dashboard')
  @Render('dashboard')
  Dashboard() {
    return { message: 'dashboard page rendered' };
  }
  @Post('register')
  Register(
    @Body() createUserDto: CreateUserDto,
    @Request() req,
    @Response() res,
  ) {
    return this.userService.Register(createUserDto, req, res);

    // res.redirect('/login')
  }

  @Post('login')
  @Render('login')
  Login(@Request() req, @Response() res, @Body() createUserDto: CreateUserDto) {
    return this.userService.Login(createUserDto, req, res);
  }

  @Get('logout')
  LogOut(@Request() req, @Response() res) {
    return this.userService.Logout(req, res);
  }

  @Post('/dashboard')
  getdarshboard(@Request() req, @Response() res) {
    res.render('dashboard');
  }
  @Get('/user')
  @Render('user')
  async showTable() {
    const data = await this.userService.getuser();
    return { data };
  }
}
