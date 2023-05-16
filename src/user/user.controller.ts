import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './user.dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.signup(createUserDto);
    return { message: 'User Created' };
  }
}
