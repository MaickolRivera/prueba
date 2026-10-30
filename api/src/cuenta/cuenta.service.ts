import { Injectable } from '@nestjs/common';
import { CreateCuentaDto } from './dto/create-cuenta.dto.js';
import { UpdateCuentaDto } from './dto/update-cuenta.dto.js';

@Injectable()
export class CuentaService {
  create(createCuentaDto: CreateCuentaDto) {
    return 'This action adds a new cuenta';
  }

  findAll() {
    return `This action returns all cuenta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cuenta`;
  }

  update(id: number, updateCuentaDto: UpdateCuentaDto) {
    return `This action updates a #${id} cuenta`;
  }

  remove(id: number) {
    return `This action removes a #${id} cuenta`;
  }
}
