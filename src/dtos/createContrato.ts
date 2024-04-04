import { IsNotEmpty, IsEnum, IsDate, IsOptional, IsNumber } from 'class-validator';
import { StatusFerias } from '@prisma/client';

enum Modalidade {
  Graduacao = 'Graduação',
  PosGraduacao = 'Pós-graduação',
}

export class CreateContratoDto {
  @IsNotEmpty()
  modalidade: Modalidade;

  @IsNotEmpty()
  @IsDate()
  dataInicio: Date;

  @IsNotEmpty()
  @IsDate()
  dataFim: Date;

  @IsOptional()
  @IsNumber()
  saldoFerias?: number;

  @IsOptional()
  @IsDate()
  dataRescisao?: Date;

  @IsOptional()
  @IsDate()
  dataInicioFerias?: Date;

  @IsOptional()
  @IsDate()
  dataFimFerias?: Date;

  @IsOptional()
  @IsEnum(StatusFerias)
  statusFerias?: StatusFerias;

  @IsOptional()
  @IsNumber()
  diasCorridos?: number;

  // Propriedade 'estagiario' adicionada
  @IsNotEmpty()
  estagiario: any; // Aqui, você precisa especificar o tipo correto para a referência ao estagiário
}