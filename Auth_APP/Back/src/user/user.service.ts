import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './Dto/user.dto';
import { User } from './model/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  async register(userData: CreateUserDto): Promise<any> {
 
    //if (await this.userModel.findOne({ email })) {
      //throw new ConflictException(`This email  is already used`);
    //}
   // const salt = await bcrypt.genSalt();
    //const hashedPassword = await bcrypt.hash(userData.password, salt);
   /* const user = await this.userModel.create({
      ...userData,
     
    });*/


    return userData;
  }

  async findAll() {
    return await this.userModel.find();
  }
}
