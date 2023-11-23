import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ShocksService } from './shocks.service';
import { CreateShockDto } from './dto/create-shock.dto';
import { UpdateShockDto } from './dto/update-shock.dto';
import {Response} from "express";

@Controller('shocks')
export class ShocksController {
  constructor(private readonly shocksService: ShocksService) {}

  @Post ('/add')
  async postAddShock (@Body() body, @Res() res: Response) {
    try {
      const newShock = await this.shocksService.postAddShock(body.requestData)
      this.resSend(res, false, { newShock }, "shock added")
    } catch (error) {
      this.resSend(res, true, null, error.message)
    }
  }


  @Post("")
  create(@Body() createShockDto: CreateShockDto) {
    return this.shocksService.create(createShockDto);
  }

  @Get()
  findAll() {
    return this.shocksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shocksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShockDto: UpdateShockDto) {
    return this.shocksService.update(+id, updateShockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shocksService.remove(+id);
  }
  private resSend(res: Response, error: boolean, data: any, message: string) {
    res.send({ error, data, message });
  }

}

export  class ShockController {

}


