import { Naturaleza } from "../enum/naturaleza.js";
import { IsString, IsEnum, IsNotEmpty, IsInt, Min, Max } from "class-validator";

export class CreateCuentaDto {
    // entre 1 y 6 dígitos
    @IsInt()
    @Min(1)
    @Max(999999)
    codigo: number;

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsNotEmpty()
    @IsEnum(Naturaleza)
    naturaleza: Naturaleza;
}