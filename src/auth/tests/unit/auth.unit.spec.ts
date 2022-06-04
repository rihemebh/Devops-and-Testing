import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing";
import { AuthController } from "../../../auth/auth.controller";
import { AuthService } from "../../../auth/auth.service";
import { UserModel } from "../../../user/tests/unit/__mocks__/user.model.mock";
import { UserController } from "../../../user/user.controller";
import { UserService } from "../../../user/user.service";
import { mockedConfigService } from "./__mock__/config.service.mock";
import { mockedJwtService } from "./__mock__/jwt.service.mock";
import * as bcrypt from 'bcrypt';
import { userStub } from "../../../user/tests/stubs/user.stub";
import { LoginUserDto } from "../../../auth/DTO/userLogin.dto";

jest.mock('../../../user/tests/unit/__mocks__/user.service.mock')
jest.mock('./__mock__/auth.service.mock')
describe('UserController unit testing', () => {

  let authController: AuthController;
  let authService: AuthService;
  let userService: UserService;
  let userModel: UserModel;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [AuthController],
      providers: [UserService, AuthService,
        {
            provide: ConfigService,
            useValue: mockedConfigService
          },
          {
            provide: JwtService,
            useValue: mockedJwtService
          },
       { provide: getModelToken("User"),
        useClass: UserModel}
      ],
    }).compile()

    authController = moduleRef.get<AuthController>(AuthController);
    userService = moduleRef.get<UserService>(UserService);
    authService = moduleRef.get<AuthService>(AuthService);
    userModel = moduleRef.get<UserModel>(getModelToken("User"));
    jest.clearAllMocks();
  })



 
describe('The AuthenticationController',  () =>  {
  let response;

  beforeEach(async () => {  
      
        const loginDto : LoginUserDto = {
          email: userStub().email,
          password: userStub().password,     
        }
        jest.spyOn(authService, 'createToken');
        //jest.spyOn(authService, 'validateUser');
        //const rep =await authService.validateUser(loginDto);
        response = await authController.login(loginDto);
   
      })
      test('create token should be called oly one time', () => {
        expect(authService.createToken).toBeCalledTimes(1)
      })
      test('create token should not throw an error', () => {

        expect(authService.createToken).toHaveReturned()

      });

      test('create token should return an object', () => {

        expect(response).toEqual({access_token: ''})


      });

    });


 /* describe('Login', () => {
    describe('when accessing the data of authenticating user', async () => {
        jest.mock('bcrypt');

     
    })
  });
*/
});
