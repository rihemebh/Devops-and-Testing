# Devops Pipeline


## Table od content
- [Devops Pipeline](#devops-pipeline)
  - [Table od content](#table-od-content)
  - [0. Tools & Prerequisite](#0-tools--prerequisite)
  - [1. Testing](#1-testing)
    - [Unit Testing](#unit-testing)
    - [Integration testing](#integration-testing)
        - [What is the difference between unit and integration testing?](#what-is-the-difference-between-unit-and-integration-testing)
     - [E2E Testing](#e2e-testing)
  - [Github workflow](#github-workflow)
  - [Azure_configuration](#azure-configuration)
  - [Refrences](#refrences)

## 0. Tools & Prerequisite
- Nest.js 
- Jest
- docker

## 1. Testing 

In this project we are using 3 types of tesing : 


### Unit Testing

Unit testing is a type of testing to check if the small piece of code or a single function is doing as per the expectation.
Example :

**Code**

```python
def calculate_factorial(number):
    if number == 1 or number == 0:
        return 1
    fact = calculate_factorial(number-1)
    return fact * number
```

**Test**

```python
 def test_calculate_factorial(self):
        # Given
        number = 3
        expected_result = 6
        # When
        result = calculate_factorial(number)
        # Then
        assert result == expected_result
```
## Integration testing

Integration testing is the phase of software testing in which individual software modules are combined and tested as a group. 
It follows unit testing and precedes system testing.
Integration testing takes as its input **modules that have been unit tested**, groups them in larger aggregates, applies tests defined in an integration test plan to those aggregates, and delivers as its output the integrated system ready for system testing.

#### What is the difference between unit and integration testing?
While unit tests always take results from a single unit, such as a function call, integration tests may aggregate results from various parts and sources.

 Integration testing might require acting like a consumer or user of the application by:

- Calling an HTTP REST API
- Calling an API
- Calling a web service


## E2E Testing


End-to-end testing is a technique that tests the entire software product from beginning to end to ensure the application flow behaves as expected. It defines the product’s system dependencies and ensures all integrated pieces work together as expected.


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

### Github actions



### Refrences 

- https://docs.github.com/en/actions/deployment/deploying-to-your-cloud-provider/deploying-to-azure/deploying-nodejs-to-azure-app-service
