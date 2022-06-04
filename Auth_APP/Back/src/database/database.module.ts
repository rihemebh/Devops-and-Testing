import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/model/user.model';
import { UserModule } from '../user/user.module';

import { DatabaseService } from './database.service';

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true,
      }),
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          uri: configService.get('CONNECTION_STRING'),
        }),
        inject: [ConfigService],
      }),
     

  ],
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule {}