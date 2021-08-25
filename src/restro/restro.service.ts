import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RestroModel } from 'src/restro/restro';
import { IRestro } from 'src/restro/restro.interface';


@Injectable()
export class RestroService {
  constructor(
    @InjectModel(RestroModel.name)
    private restroModel: Model<RestroModel>,
  ) {}

  async findAll(): Promise<IRestro[]> {
    return await this.restroModel.find().exec();
  }

  async search(name: string, sort:number|undefined): Promise<IRestro[]> {
    if(sort){
    return await this.restroModel
      .find({ name: { $regex: name, $options: 'i' } }).sort({"cuisines.price":sort})
      .exec();
    }else{
      return await this.restroModel
      .find({ name: { $regex: name, $options: 'i' } })
      .exec();
    }
  }

  async findOne(id: string): Promise<IRestro> {
    return await this.restroModel.findOne({ _id: id });
  }

  async create(restro: IRestro): Promise<IRestro> {
    const restro1 = new this.restroModel(restro);
    return await restro1.save();
  }

  async createMultiple(restro: IRestro[]): Promise<IRestro> {
    const restro1 = new this.restroModel(restro);
    return await restro1.save();
  }

  async delete(id: string): Promise<IRestro> {
    return await this.restroModel.findByIdAndRemove(id);
  }

  async deleteAll(): Promise<IRestro> {
    console.log("inside remove")
    return await this.restroModel.remove();
  }

  async update(id: string, product: IRestro): Promise<IRestro> {
    return await this.restroModel.findByIdAndUpdate(id, product, {
      new: true,
    });
  }
}
