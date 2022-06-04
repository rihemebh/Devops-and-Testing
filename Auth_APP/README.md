
# About
This app is developed with Nest.js and Angular.
It allow you to create users and login.

The backend is tested with jest : unit, integration and e2e testing.

# How to test it 
- Clone the repo
- Open the project called  back 
- Install dependencies : ``npm install && jest``
- Launch test ``npm test`` for unit and integration testing 
- Launch test ``npm run test:e2e`` for unit and End to End testing 
# Unit & Integration Testing




## Unit

- Example for the User module: 

1. Create mock services

```typescript
export const MockUserService = jest.fn().mockReturnValue({
    register: jest.fn().mockResolvedValue(userStub()),
    findAll: jest.fn().mockResolvedValue([userStub()]),
})
```
2. Create Mock Model

```typescript
export abstract class MockModel<T> {
    protected abstract entityStub: T;
  
    constructor(createEntityData: T) {
      this.constructorSpy(createEntityData);
    }
  
    constructorSpy(_createEntityData: T): void {}
  
    findOne(): { exec: () => T } {
      return {
        exec: (): T => this.entityStub
      }
    }
  
    async find(): Promise<T[]> {
      return [this.entityStub]
    }
  
    async create(): Promise<T> {
      return this.entityStub;
    }
  }
```
3. Initialize test with it dependecies : controller, service, mockModel ...

```typescript
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [UserService, {
        provide: getModelToken("User"),
        useClass: UserModel
      }],
    }).compile()
```
4. Test every function in the controller :
    - First we should test that the service is ccalled seccessfully 
    - Then we should test if we have the expected return value

```typescript
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
```

We used the autoMocking of the service: 

```typescript
jest.mock('./__mocks__/user.service')
```
    
    
## Integration Testing 

Unlike unit testing we don't need to mock models or services.


```typescript
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleRef.createNestApplication<NestExpressApplication>();
    await app.listen(3333);
    httpServer = app.getHttpServer();
    dbConnection = moduleRef.get<DatabaseService>(DatabaseService).getDbHandle();
 
  })

```

The database service is the one responsoble for the connection 

Note that in the module we added : 

```typescript
 MongooseModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          uri: configService.get('CONNECTION_STRING'),
        }),
        inject: [ConfigService],
      }),
```

Example of testing : 


```typescript
describe('createUser', () => {
    it('should create a user', async () => {
      const createUserRequest: CreateUserDto = {
        name: userStub().name,
        email: userStub().email,
        password: userStub().password,
        phoneNumber: userStub().phoneNumber
      }
      
      const response = await request(httpServer).post('/user/register').send(createUserRequest)
      console.log(response.body)
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(createUserRequest);

      const user = await dbConnection.collection('users').findOne({ email: createUserRequest.email });
    
      expect(user.name).toEqual(createUserRequest.name);
    })
  })
})
```

   Userstub contains the user that we created for test
   

   
 ## Results:
 
 <img src="https://github.com/rihemebh/Software-Test/blob/main/Auth_APP/result.PNG" />
   
# E2E Testing 

Example of testing user creation: 

```typescript
it('should create a new user', ()=>{
    return request(app.getHttpServer())
    .post('/user/register')
    .send({
        name : "test",
        email : "test@hotmail.com",
        password : "12345678",
        phoneNumber : "23569874"
    })
    .expect(201)
});


```
 <img src="https://github.com/rihemebh/Software-Test/blob/main/Auth_APP/e2e_result.PNG" />
### Results


## References : 

 - https://github.com/mguay22/nestjs-mongo/tree/abstract-repository
