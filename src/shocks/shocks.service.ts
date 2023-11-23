import { Injectable } from '@nestjs/common';
import { CreateShockDto } from './dto/create-shock.dto';
import { UpdateShockDto } from './dto/update-shock.dto';
import { Shock} from "./schemas/shock.schema";
import {InjectModel} from "@nestjs/mongoose";
import { Model } from 'mongoose';


@Injectable()
export class ShocksService {

  constructor(
      @InjectModel('Shock') private readonly shockModel: Model<Shock>
  ) {}
  async postAddShock (shockData): Promise<Shock> {
    const shockExist = await this.shockModel.findOne({code: shockData.code})
    if (shockExist) throw new Error("This shock is already created");

    const newShock = new this.shockModel(shockData)
    return newShock.save()
  }


  create(createShockDto: CreateShockDto) {
    return 'This action adds a new shock';
  }

  findAll() {
    return `This action returns all shocks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shock`;
  }

  update(id: number, updateShockDto: UpdateShockDto) {
    return `This action updates a #${id} shock`;
  }

  remove(id: number) {
    return `This action removes a #${id} shock`;
  }
}
