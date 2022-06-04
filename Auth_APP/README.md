
# About
This app is developed with Nest.js and Angular.
The backend is tested with jest.

## How to test it 
- Clone the repo
- Install dependencies : ``npm install && jest``
- Launch test ``npm test``

# Unit Testing 

We will create some tests on the backend modules (UserModule) 

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

We used the autoMocking : 

```typescript
jest.mock('./__mocks__/user.service')
```

### Results : 

<img src="https://github.com/rihemebh/Software-Test/blob/main/Auth_APP/test_result.PNG" />

#### References : 

   - https://github.com/mguay22/nestjs-mongo/tree/abstract-repository
    
    
# Integration Testing 

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
   
   
   Result 
   
   <img src="https://github.com/rihemebh/Devops-and-Testing/blob/main/Auth_APP/unit_integration_result.PNG" />
   
   
   
 ### Results of unit and integration testings 
 
 <img src="https://github.com/rihemebh/Software-Test/blob/main/Auth_APP/result.PNG" />
   
# E2E Testing 
