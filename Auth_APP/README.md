
# About
This app is developed with Nest.js and Angular and tested with jest.



# Unit Testing 

We will create some tested on the backend modules (UserModule and AuthModule) 

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

References : 
    - https://github.com/mguay22/nestjs-mongo/tree/abstract-repository
