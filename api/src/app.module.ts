import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CuentaModule } from './cuenta/cuenta.module.js';

@Module({
  imports: [CuentaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
