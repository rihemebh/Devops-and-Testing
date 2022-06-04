import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest'
import { AppModule } from './../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

})



it('should create a new user', ()=>{
    return request(app.getHttpServer())
    .post('/user/register')
    .send({
        name : "riheme",
        email : "rihemem@hotmail.com",
        password : "12345678",
        phoneNumber : "23569874"
    })
    .expect(201)
});



})