
import { User } from "../model/user.model";
import { userStub } from "../stubs/user.stub";
import { MockModel } from "./mock.model";

export class UserModel extends MockModel<User> {
  protected entityStub = userStub()
}