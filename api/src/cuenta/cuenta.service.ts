import { Injectable } from '@nestjs/common';
import { CreateCuentaDto } from './dto/create-cuenta.dto.js';
import { UpdateCuentaDto } from './dto/update-cuenta.dto.js';

export interface Cuenta extends CreateCuentaDto {
  id: number;
}

@Injectable()
export class CuentaService {

  private cuentas: Cuenta[] = [];
  private nextId = 1;

  create(createCuentaDto: CreateCuentaDto) {
    const cuenta: Cuenta = { id: this.nextId++, ...createCuentaDto };
    this.cuentas.push(cuenta);
    return 'This action adds a new cuenta with code: ' + cuenta.codigo;
  }

  findAll() {
    return this.cuentas;
  }

  update(id: number, updateCuentaDto: UpdateCuentaDto) {
    const index = this.cuentas.findIndex(cuenta => cuenta.id === id);
    if (index !== -1) {
      this.cuentas[index] = { ...this.cuentas[index], ...updateCuentaDto };
    }
    return `This action updates a #${id} cuenta`;
  }

  remove(id: number) {
    const index = this.cuentas.findIndex(cuenta => cuenta.id === id);
    if (index !== -1) {
      this.cuentas.splice(index, 1);
    }
    return `This action removes a #${id} cuenta`;
  }
}
