import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './DTO/userLogin.dto';
import { STATUS } from 'src/utils/enum';
import { User } from 'src/user/model/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,

    private jwtService: JwtService,
  ) {}

  async validateUser(loginInfo: LoginUserDto): Promise<any> {
    const { password, email } = loginInfo;
    const user = await this.userModel.findOne({ email }).select('+password');

    if (user && user.status === STATUS.activated) {
      const testPassword = bcrypt.compareSync(password, user.password);
      if (testPassword) {
        const payload = { email: user.email, sub: user._id };
        return payload;
      } else {
        throw new PreconditionFailedException('Wrong Credentials ');
      }
    }
    throw new PreconditionFailedException(
      'Wrong Credentials or Unconfirmed Email ! ',
    );
  }

  async createToken(payload, expirationDate: number) {
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: +expirationDate,
      }),
    };
  }

  async verifyConfirmToken(token: string) {
    const payload = await this.jwtService.verify(token);
    const user = await this.verifyToken(token);
    if (user) {
      await user.model.findByIdAndUpdate(
        user.data._id,
        {
          status: STATUS.activated,
        },
        { new: true },
      );

      throw new HttpException('Email confirmed', HttpStatus.OK);
    } else {
      throw new NotAcceptableException();
    }
  }

  async verifyToken(token: string) {
    const payload = await this.jwtService.verify(token);
    const user = { data: null, model: null };
    user.data = await this.userModel.findById(payload.sub);
    user.model = this.userModel;

    if (user) {
      return user;
    } else {
      throw new NotFoundException();
    }
  }
}
