import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { CreateUserDto } from './Dto/user.dto';
import { User } from './model/user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({})
  async register(@Body() createShopperDto: CreateUserDto) {
    return await this.userService.register(createShopperDto);
  }

  @Get()
  async findAll(){

    return this.userService.findAll();
    
  }
}
