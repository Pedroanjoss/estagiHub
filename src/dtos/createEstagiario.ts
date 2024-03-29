import { IsNotEmpty, MaxLength, Length } from 'class-validator';
import { Status as StatusEnum } from '@prisma/client';

export class CreateEstagiarioDto {
  @IsNotEmpty()
  @MaxLength(60)
  nome: string;

  @IsNotEmpty()
  @MaxLength(60)
  email: string;

  @IsNotEmpty()
  @Length(11, 11, { message: 'O telefone deve ter exatamente 11 caracteres' })
  telefone: string;

  @IsNotEmpty()
  status: StatusEnum;

  @IsNotEmpty()
  senha: string;
}
