import { Test, TestingModule } from '@nestjs/testing';
import { CuentaController } from './cuenta.controller.js';
import { CuentaService } from './cuenta.service.js';

describe('CuentaController', () => {
  let controller: CuentaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CuentaController],
      providers: [CuentaService],
    }).compile();

    controller = module.get<CuentaController>(CuentaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
