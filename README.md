# Devops Pipeline

This app is developed with Nest.js, it is an auth app tested with Jest: : unit, integration and e2e testing



## Table of content

  - [0. Preferences](#0-preferences)
  - [1. Testing](#1-testing)
    - [Unit Testing](#unit-testing)
    - [Integration testing](#integration-testing)
        - [What is the difference between unit and integration testing?](#what-is-the-difference-between-unit-and-integration-testing)
     - [E2E Testing](#e2e-testing)
     - [User acceptance Testing](#user-acceptance-testing)
  - [Github workflow](#github-workflow)
    - [Continuous Integration pipeline](#ci-pipeline)
    - [Deployment with Azure webapp](#deployement-with-azure-webapp)
  - [References](#refrences)

## 0. Preferences

### Tools
- Azure account 
- Nest.js 
- Jest


### How to test it 
- Clone the repo
- Install dependencies : ``npm install && jest``
- Launch test ``npm test`` for unit and integration testing 
- Launch test ``npm run test:e2e`` for unit and End to End testing 
- Create Azure webapp 
- Add the webapp's profile publish to github secrets
- Push to deploy  

You app will be available for you via this link: https://<your-webapp-name>.azurewebsites.net

For my case it is : https://delsos-app.azurewebsites.net
  

## 1. Testing 

In this project we are using 3 types of tesing : 


### Unit Testing

Unit testing is a type of testing to check if the small piece of code or a single function is doing as per the expectation.


#### Example for the User module: 

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
    
    

### Integration testing

Integration testing is the phase of software testing in which individual software modules are combined and tested as a group. 
It follows unit testing and precedes system testing.
Integration testing takes as its input **modules that have been unit tested**, groups them in larger aggregates, applies tests defined in an integration test plan to those aggregates, and delivers as its output the integrated system ready for system testing.

#### What is the difference between unit and integration testing?
While unit tests always take results from a single unit, such as a function call, integration tests may aggregate results from various parts and sources.

 Integration testing might require acting like a consumer or user of the application by:

- Calling an HTTP REST API
- Calling an API
- Calling a web service

#### Example: 

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
   

   
 #### Results:
 
 <img src="https://github.com/rihemebh/Devops-and-Testing/blob/main/result.PNG" />
   
### E2E Testing


End-to-end testing is a technique that tests the entire software product from beginning to end to ensure the application flow behaves as expected. It defines the product’s system dependencies and ensures all integrated pieces work together as expected.

  
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
  

  
#### Results
  
 <img src="https://github.com/rihemebh/Devops-and-Testing/blob/main/e2e_results.PNG" />
  
### User Acceptance Testing
  

## Github workflow

### CI pipeline

In this part we will automate the tests written in the previous chapter using github actions: 

```yaml
  Test:
    runs-on: ubuntu-latest
    steps:
      - name: Check out repository code
        uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "14"
      - run: npm install
      - run: |
          touch .env
          echo CONNECTION_STRING="${{ secrets.MONGO_CONNECTION_STRING }}" >> .env
          echo APP_PORT = 3000 >> .env
          echo MORGAN_ENV = "dev" >> .env
      - run: npm test
      - run: npm run test:e2e

```

### Deployment with Azure web app 

#### Steps: 
- Create azure group 
- Create azure plan : ``az appservice plan create 
   --resource-group MY_RESOURCE_GROUP 
   --name MY_APP_SERVICE_PLAN 
   --is-linux``
- Create azure web app : ``az webapp create 
    --name MY_WEBAPP_NAME 
    --plan MY_APP_SERVICE_PLAN 
    --resource-group MY_RESOURCE_GROUP 
    --runtime "NODE|14-lts"``
- Add pulish profile to Github secrets 


#### Deploy job : 
```yaml
    - name: 'Deploy to Azure WebApp'
      id: deploy-to-webapp 
      uses: azure/webapps-deploy@v2
      with:
        app-name: ${{ env.AZURE_WEBAPP_NAME }}
        publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
        package: ${{ env.AZURE_WEBAPP_PACKAGE_PATH }}

```

## Refrences 
- https://github.com/mguay22/nestjs-mongo/tree/abstract-repository
- https://docs.github.com/en/actions/deployment/deploying-to-your-cloud-provider/deploying-to-azure/deploying-nodejs-to-azure-app-service
- https://docs.microsoft.com/en-us/azure/devops/pipelines/release/artifacts?view=azure-devops
