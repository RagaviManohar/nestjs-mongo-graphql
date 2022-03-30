import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { User, UserDocument } from "./user.schema";
import { UserType } from "./user.dto";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async create(createUserDto: UserType): Promise<User> {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async update(id: string, updateUserDto: UserType): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
}
