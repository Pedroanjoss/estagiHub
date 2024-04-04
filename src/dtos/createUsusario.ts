import { IsNotEmpty, MaxLength, Length, IsEnum } from 'class-validator';
import { Status as StatusEnum, Perfil as PerfilEnum } from '@prisma/client';

export class CreateUsuarioDto {
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
  @IsEnum(PerfilEnum)
  perfil: PerfilEnum;

  @IsNotEmpty()
  @IsEnum(StatusEnum)
  status: StatusEnum;

  @IsNotEmpty()
  senha: string;
}
