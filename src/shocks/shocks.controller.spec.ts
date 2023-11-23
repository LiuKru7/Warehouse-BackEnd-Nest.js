import { Test, TestingModule } from '@nestjs/testing';
import { ShocksController } from './shocks.controller';
import { ShocksService } from './shocks.service';

describe('ShocksController', () => {
  let controller: ShocksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShocksController],
      providers: [ShocksService],
    }).compile();

    controller = module.get<ShocksController>(ShocksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
