from app import get_user, calculate_factorial
from unittest import TestCase


class TestApp(TestCase):
    def test_calculate_factorial(self):
        # Given
        number = 3
        expected_result = 6
        # When
        result = calculate_factorial(number)
        # Then
        assert result == expected_result

    def test_get_uer(self, mocked_class):
        # Given
        mocked_class.connect().execute().fetchone.return_value = (5, "John Doe")
        expected_user = {
            "user_id": 5,
            "name": "John Doe"
        }

        # when
        returned_user = get_user(5)

        # then
        # assertEqual(expected_user, returned_user)
