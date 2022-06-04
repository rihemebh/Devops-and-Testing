import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/model/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter('token'),
      ]),
      ignoreExpiration: false,
      secretOrKey: "Y6RqVQjXnlOkQBrDFMKATdbScugtw4T3fiFJZDrzlkgVg47N1C",
    });
  }

  async validate(payload: any) {
    const user = await this.userModel.findOne({ email: payload.email });
    if (!user) {
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }
}
