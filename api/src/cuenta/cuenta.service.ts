import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCuentaDto } from './dto/create-cuenta.dto.js';
import { UpdateCuentaDto } from './dto/update-cuenta.dto.js';

export interface Cuenta extends CreateCuentaDto {
  id: number;
}

@Injectable()
export class CuentaService {

  private cuentas: Cuenta[] = [];
  private nextId = 1;

  private assertCodigoUnico(codigo: number, ignoreId?: number) {
    const existe = this.cuentas.some(c => c.codigo === codigo && c.id !== ignoreId);
    if (existe) {
      throw new ConflictException(`Ya existe una cuenta con el código ${codigo}`);
    }
  }

  create(createCuentaDto: CreateCuentaDto) {
    this.assertCodigoUnico(createCuentaDto.codigo);
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
      if (updateCuentaDto.codigo !== undefined) {
        this.assertCodigoUnico(updateCuentaDto.codigo, id);
      }
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
