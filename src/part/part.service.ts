import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Part } from './schemas/part.schema';
import { PartHistory } from './schemas/part-history.schema';
import * as QRCode from 'qrcode';

@Injectable()
export class PartsService {

  constructor(
      @InjectModel('Part') private readonly partModel: Model<Part>,
      @InjectModel('PartHistory') private readonly partHistoryModel: Model<PartHistory>
  ) {}

  async getAllParts(): Promise<Part[]> {
    return this.partModel.find();
  }

  async getExpiredParts(): Promise<Part[]> {
    return this.partModel.find({ quantity: 0 });
  }

  async getPartHistory(code: string): Promise<PartHistory> {
    return this.partHistoryModel.findOne({ code }).exec();
  }

  async getPart (code: string) : Promise<Part> {
    return this.partModel.findOne({code})
  }

  async addPart(partData): Promise<Part> {
    const partExists = await this.partModel.findOne({ code: partData.code });
    if (partExists) throw new Error("This part is already created");

    try {
      const qrCode = await QRCode.toDataURL(partData.code);
      partData.qrCode = qrCode;
    } catch (error) {
      throw new Error("Error generating QRCode: " + error.message);
    }

    const newPartHistory = new this.partHistoryModel({
      code: partData.code,
      history: [{
        info: "add",
        quantity: partData.quantity,
        date: new Date()
      }]
    });
    await newPartHistory.save();

    const newPart = new this.partModel(partData);
    return newPart.save();
  }

  async addPartQuantity(code: string, quantity: number): Promise<Part> {
    const updatedPart = await this.partModel.findOneAndUpdate(
        { code },
        { $inc: { quantity } },
        { new: true }
    );

    if (!updatedPart) throw new NotFoundException('Part not found');

    await this.partHistoryModel.findOneAndUpdate(
        { code },
        { $push: { history: { info: "add", quantity: quantity, date: new Date() } } }
    );
    return updatedPart;
  }

  async takePartQuantity(code: string, quantity: number): Promise<Part> {
    const updatedPart = await this.partModel.findOneAndUpdate(
        { code },
        { $inc: { quantity: -quantity } },
        { new: true }
    );

    if (!updatedPart) throw new NotFoundException('Part not found');

    await this.partHistoryModel.findOneAndUpdate(
        { code },
        { $push: { history: { info: "take", quantity: -quantity, date: new Date() } } }
    );
    return updatedPart;
  }
}

export class PartService {
}