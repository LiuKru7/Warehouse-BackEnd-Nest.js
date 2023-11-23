import { Controller, Get, Post, Body, Res, Param } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { PartsService } from './part.service';
import { Response } from 'express';


class PartType {
  requestData: {
    name: string;
    quantity: number;
    description: string;
  };
}


@Controller('parts')
export class PartsController {

  constructor(private readonly partsService: PartsService) {}

  @Get()
  async getAllParts(@Res() res: Response) {
    try {
      const parts = await this.partsService.getAllParts();
      this.resSend(res, false, { parts }, "");
    } catch (error) {
      this.resSend(res, true, null, error.message);
    }
  }

  @Get('/expired')
  async getExpiredParts(@Res() res: Response) {
    try {
      const parts = await this.partsService.getExpiredParts();
      this.resSend(res, false, { parts }, "");
    } catch (error) {
      this.resSend(res, true, null, error.message);
    }
  }

  @Post('/add')
  async postAddPart(@Body() body:PartType, @Res() res: Response) {
    try {
      const newPart = await this.partsService.addPart(body.requestData);
      this.resSend(res, false, { newPart }, "Part added successfully");
    } catch (error) {
      this.resSend(res, true, null, error.message);
    }
  }

  @Post('/addPartQuantity')
  async postAddPartQuantity(@Body('requestData') data: { quantity: number, code: string }) {
    if (isNaN(data.quantity)) {
      throw new BadRequestException('Invalid quantity provided');
    }

    try {
      const updatedPart = await this.partsService.addPartQuantity(data.code, data.quantity);
      return {
        error: false,
        data: { updatedPart },
        message: "Part quantity updated successfully"
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


  @Post('/takePartQuantity')
  async postTakePartQuantity(@Body('requestData') data: { quantity: number, code: string }) {

    if (isNaN(data.quantity)) {
      throw new BadRequestException('Invalid quantity provided');
    }
    try {
      const updatedPart = await this.partsService.takePartQuantity(data.code, data.quantity);
      return {
        error: false,
        data: {updatedPart},
        message: "Part taken"
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


  @Get('/history/:code')
  async getPartHistory(@Param('code') code: string, @Res() res: Response) {
      const history = await this.partsService.getPartHistory(code);
      if (!history) throw new Error("No history found for the specified code");
      try {
      res.send({ error: false, data: history, message: "" });
    } catch (error) {
      res.send({ error: true, data: null, message: error.message });
    }
  }
  @Get ('/:code')
  async getPart(@Param('code') code: string, @Res () res: Response) {
      const part = await this.partsService.getPart(code);
      if (!part) throw  new Error("No part found for the specified code");
      try{
      res.send({error: false, data: part, message: ""})
    } catch (error) {
      res.send({ error: true, data: null, message: error.message });
    }
  }

  private resSend(res: Response, error: boolean, data: any, message: string) {
    res.send({ error, data, message });
  }
}

export class PartController {
}