import { Test } from '@nestjs/testing';
import { userStub } from '../stubs/user.stub';
import { Connection } from 'mongoose';
import { AppModule } from '../../../app.module';
import { DatabaseService } from '../../../database/database.service';
import  * as request from 'supertest';
import { CreateUserDto } from '../../Dto/user.dto';
import { NestExpressApplication } from '@nestjs/platform-express';


describe('UsersController', () => {
  let dbConnection: Connection;
  let app:  NestExpressApplication;
  let httpServer : any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleRef.createNestApplication<NestExpressApplication>();
    await app.listen(3333);
    httpServer = app.getHttpServer();
    dbConnection = moduleRef.get<DatabaseService>(DatabaseService).getDbHandle();
 
  })

  afterAll(async () => {
    await app.close();
  })

  beforeEach(async () => {
    await dbConnection.collection('users').deleteMany({});
  })

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      await dbConnection.collection('users').insertOne(userStub())
      const response = await request(httpServer).get('/user');
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([userStub()]);
    })
  })

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserRequest: CreateUserDto = {
        name: userStub().name,
        email: userStub().email,
        password: userStub().password,
        phoneNumber: userStub().phoneNumber
      }
      
      const response = await request(httpServer).post('/user/register').send(createUserRequest)
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(createUserRequest);

      const user = await dbConnection.collection('users').findOne({ email: createUserRequest.email });
    
      expect(user.name).toEqual(createUserRequest.name);
    })
  })
})