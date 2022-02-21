import sqlite3


def calculate_factorial(number):
    if number == 1 or number == 0:
        return 1
    fact = calculate_factorial(number-1)
    return fact * number


def get_user(user_id):
    connection = sqlite3.connect('example.db')
    item = connection.execute(f'SELECT * FROM users WHERE id = ${user_id}').execute()
