import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { CreateUserDto } from './Dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({})
  async shopperRregister(@Body() createShopperDto: CreateUserDto) {
    console.log(createShopperDto);
    return await this.userService.registerUser(createShopperDto);
  }
}
