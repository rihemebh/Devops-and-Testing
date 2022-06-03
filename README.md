# Software-Test
## Unit Testing

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

What is the difference between unit and integration testing?
While unit tests always take results from a single unit, such as a function call, integration tests may aggregate results from various parts and sources.

 Integration testing might require acting like a consumer or user of the application by:

- Calling an HTTP REST API
- Calling a Python API
- Calling a web service
- Running a command line

Example : 

**Code**

```python

```

**Test**

```python

```


## E2E Testing
