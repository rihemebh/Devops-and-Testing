import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { Model } from 'mongoose';
import { LoginUserDto } from 'src/auth/DTO/userLogin.dto';
import { CreateUserDto } from './Dto/user.dto';
import { User, UserSchema } from './model/user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';


describe('UserController', () => {
  let userController: UserController;
  let userService : UserService;
 
  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: UserService,
      useFactory: () => ({
        register: jest.fn((user : CreateUserDto) => {}),
        findAll: jest.fn(()=> [])
    
      })
    }


    const app: TestingModule = await Test.createTestingModule({
    
      controllers: [UserController],
      providers: [ApiServiceProvider, 
      
    {
        provide: getModelToken('User'),
        useValue: Model
    }],
    }).compile();

    userController = app.get<UserController>(UserController);
    userService = app.get<UserService>(UserService);
  });
 

  describe('user', () => {
    it('the service should be defined first ', async () => {
      expect(userService).toBeDefined()
    });

    it('expect to return a list ', async ()=>{

        expect(await userController.findAll()).toEqual([])
    });

  });
});
