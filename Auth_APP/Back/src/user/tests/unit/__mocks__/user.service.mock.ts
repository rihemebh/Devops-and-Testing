import { userStub } from "src/user/tests/stubs/user.stub";

export const MockUserService = jest.fn().mockReturnValue({
    register: jest.fn().mockResolvedValue(userStub()),
    findAll: jest.fn().mockResolvedValue([userStub()]),

})