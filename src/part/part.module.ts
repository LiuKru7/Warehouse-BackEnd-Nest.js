import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PartsController } from './part.controller';
import { PartsService } from './part.service';
import { PartSchema } from './schemas/part.schema';
import { PartHistorySchema } from './schemas/part-history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Part', schema: PartSchema },
      { name: 'PartHistory', schema: PartHistorySchema }
    ])
  ],
  controllers: [PartsController],
  providers: [PartsService],
})
export class PartModule {}
