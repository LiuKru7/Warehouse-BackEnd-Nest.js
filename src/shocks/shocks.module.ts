import { Module } from '@nestjs/common';
import { ShocksService } from './shocks.service';
import { ShocksController } from './shocks.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {ShockSchema} from "./schemas/shock.schema";

@Module({
  imports: [
      MongooseModule.forFeature([
        {name: 'Shock', schema: ShockSchema}
      ])
  ],
  controllers: [ShocksController],
  providers: [ShocksService],
})
export class ShocksModule {}
