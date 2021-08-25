import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './users.interface';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name)
    private userModel: Model<UserModel>,
  ) {}

  async findAll(): Promise<IUser[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<IUser> {
    return await this.userModel.findOne({ _id: id });
  }

  async filter(filters:any): Promise<IUser[]> {
    return await this.userModel.find(filters).exec()
  }

  async create(user: IUser): Promise<IUser> {
    const newProduct = new this.userModel(user);
    return await newProduct.save();
  }

  async delete(id: string): Promise<IUser> {
    return await this.userModel.findByIdAndRemove(id);
  }

  async update(id: string, product: IUser): Promise<IUser> {
    return await this.userModel.findByIdAndUpdate(id, product, {
      new: true,
    });
  }
}
