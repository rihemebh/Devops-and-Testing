import { User } from "src/user/model/user.model";

export const userStub  = (): User => ({
name : 'jihene', 
password: '123456789',
email : 'jihene@gmail.com',
phoneNumber : '28456987'
} as User)