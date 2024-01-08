import { Test, TestingModule } from '@nestjs/testing';
import { CryptotxController } from './cryptotx.controller';

describe('CryptotxController', () => {
  let controller: CryptotxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptotxController],
    }).compile();

    controller = module.get<CryptotxController>(CryptotxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
