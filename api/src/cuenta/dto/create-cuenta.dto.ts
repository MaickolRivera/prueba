import { IsString } from "class-validator/types/decorator/typechecker/IsString.js";
import { Naturaleza } from "../enum/naturaleza.js";
import { IsEnum, IsNotEmpty } from "class-validator";

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