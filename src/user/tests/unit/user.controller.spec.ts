import { Test } from '@nestjs/testing';
import { userStub } from '../stubs/user.stub';
import { CreateUserDto } from '../../Dto/user.dto';
import { User } from '../../model/user.model';
import { UserController } from '../../user.controller';
import { UserService } from '../../user.service';
import { getModelToken } from '@nestjs/mongoose';
import { UserModel } from './__mocks__/user.model.mock';
import { MockUserService } from './__mocks__/user.service.mock';

jest.mock('./__mocks__/user.service.mock')

describe('UserController unit testing', () => {

  let userController: UserController;
  let userService: UserService;
  let userModel: UserModel;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [UserService, {
        provide: getModelToken("User"),
        useClass: UserModel
      }],
    }).compile()

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
    userModel = moduleRef.get<UserModel>(getModelToken("User"));
    jest.clearAllMocks();
  })


  describe('get Users', () => {
    describe('When findAll is called', () => {
      let users: User[];

      beforeEach(async () => {
        jest.spyOn(userService, 'findAll');
        users = await userController.findAll()
      })
      test('the service should be called', () => {
        expect(userService.findAll).toHaveBeenCalled();
      })
      test('then it should return a list of users', () => {
        expect(users).toEqual([userStub()])
      })
    })
  });

  describe('Register User', () => {
    describe('When register function is called', () => {
    
      let user: User;
      let createUserDto: CreateUserDto;

      beforeEach(async () => {  
        jest.spyOn(userService, 'register');
        createUserDto = {
          email: userStub().email,
          password: userStub().password,
          name: userStub().name,
          phoneNumber: userStub().phoneNumber,
        }
        user = await userController.register(createUserDto);
      })
      test('the service should be called', () => {
        expect(userService.register).toHaveBeenCalledWith(createUserDto);
      })
      test('then it should return a user', () => {
        expect(user).toEqual(userStub())
      })
    })
  })
  
});
