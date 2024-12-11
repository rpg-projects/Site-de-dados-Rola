import userModel from "../database/models/userModel";
import { ICompleteUser } from "../types/authDTOs";
import { IUser } from "../types/userDTOs";

export default class AuthRepository {
  async getByEmail(email: string): Promise<ICompleteUser> {
    return userModel
      .findOne({ email }, "_id email player_id password")
      .exec() as unknown as ICompleteUser;
  }

  async updatePassword(_id: string, password: string): Promise<IUser | null> {
    return userModel.findByIdAndUpdate({ _id }, { password });
  }
}
