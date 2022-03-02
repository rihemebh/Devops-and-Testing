import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './Dto/user.dto';
import { User } from './model/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  async registerUser(userData: CreateUserDto): Promise<any> {
    const email = userData.email;

    if (await this.userModel.findOne({ email })) {
      throw new ConflictException(`This email  is already used`);
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    const user = await this.userModel.create({
      ...userData,
      password: hashedPassword,
    });

    const confirmToken = await this.authService.createToken(
      {
        email: email,
        sub: user._id,
      },
      this.configService.get('CONFIRM_TOKEN_EXPIRATION'),
    );

    return confirmToken;
  }
}
