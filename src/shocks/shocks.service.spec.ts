import { Test, TestingModule } from '@nestjs/testing';
import { ShocksService } from './shocks.service';

describe('ShocksService', () => {
  let service: ShocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShocksService],
    }).compile();

    service = module.get<ShocksService>(ShocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
