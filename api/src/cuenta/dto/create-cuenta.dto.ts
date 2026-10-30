import { Naturaleza } from "../enum/naturaleza.js";
import { IsString, IsEnum, IsNotEmpty } from "class-validator";

export class CreateCuentaDto {
    @IsString()
    @IsNotEmpty()
    codigo: string;

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsNotEmpty()
    @IsEnum(Naturaleza)
    naturaleza: Naturaleza;
}