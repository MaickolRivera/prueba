import { Module } from '@nestjs/common';
import { CuentaService } from './cuenta.service.js';
import { CuentaController } from './cuenta.controller.js';

@Module({
  controllers: [CuentaController],
  providers: [CuentaService],
})
export class CuentaModule {}
