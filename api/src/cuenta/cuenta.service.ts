import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateCuentaDto } from './dto/create-cuenta.dto.js';
import { UpdateCuentaDto } from './dto/update-cuenta.dto.js';

export interface Cuenta extends CreateCuentaDto {
  id: number;
}

// longitud del código -> longitud del código de su padre (0 = raíz)
const PARENT_LENGTH: Record<number, number> = { 1: 0, 2: 1, 4: 2, 6: 4 };

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

  /**
   * Los niveles del código son 1, 2, 4 y 6 dígitos (1 → 11 → 1105 → 110505).
   * El padre es el prefijo del nivel inmediatamente superior; la raíz no tiene.
   */
  private parentCodigo(codigo: number): number | null {
    const str = String(codigo);
    const parentLength = PARENT_LENGTH[str.length];
    if (parentLength === undefined) {
      throw new BadRequestException(
        `El código ${codigo} debe tener 1, 2, 4 o 6 dígitos`,
      );
    }
    return parentLength === 0 ? null : Number(str.slice(0, parentLength));
  }

  private assertPadreExiste(codigo: number) {
    const padre = this.parentCodigo(codigo);
    if (padre !== null && !this.cuentas.some(c => c.codigo === padre)) {
      throw new BadRequestException(
        `No existe la cuenta padre ${padre} para el código ${codigo}`,
      );
    }
  }

  create(createCuentaDto: CreateCuentaDto) {
    this.assertCodigoUnico(createCuentaDto.codigo);
    this.assertPadreExiste(createCuentaDto.codigo);
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
        this.assertPadreExiste(updateCuentaDto.codigo);
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
