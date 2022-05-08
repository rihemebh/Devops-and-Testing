import { User } from "src/user/model/user.model";

export const userStub  = (): User => ({
name : 'Riheme', 
password: '12345678',
email : 'riheme@gmail.com',
phoneNumber : '23456987'
} as User)