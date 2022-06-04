# Devops Pipeline

NOTE: PLEASE CHECK THE APP FOLDER TO SEE MORE DETAILS ABOUT THE IMPLEMENTATION OR CLICK [HERE](https://github.com/rihemebh/Devops-and-Testing/blob/main/Auth_APP/README.md)

## Table od content

- [1. Testing](#1-testing)
   - [Unit Test](#unit-testing)
   - [Integration Test](#integration-testing)
   - [E2E Test](#e2e-testing)
- [2. CI/CD Pipeline](#)
- [3. Github workflow](#)
- [4. Deployement](#)


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
