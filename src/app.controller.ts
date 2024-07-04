import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { CreateEstagiarioDto } from './dtos/createEstagiario';
import { CreateUsuarioDto } from './dtos/createUsuario';
import { CreateContratoDto } from './dtos/createContrato';
import { Contrato } from '@prisma/client';

@Controller('app')
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private prisma: PrismaService) {}

  @Post('estagiarios')
  async createEstagiario(
    @Body() estagiarioData: CreateEstagiarioDto,
  ): Promise<any> {
    return this.prisma.estagiario.create({
      data: estagiarioData,
    });
  }

  @Get('estagiarios')
  async getEstagiarios(): Promise<any> {
    return this.prisma.estagiario.findMany();
  }

  @Get('estagiarios/:id')
  async getEstagiarioById(@Param('id') id: string): Promise<any> {
    const estagiario = await this.prisma.estagiario.findUnique({
      where: { id },
    });
    if (!estagiario) {
      throw new NotFoundException(`Estagiario com o ID ${id} não encontrado`);
    }
    return estagiario;
  }

  @Put('estagiarios/:id')
  async updateEstagiario(
    @Param('id') id: string,
    @Body() estagiarioData: any,
  ): Promise<any> {
    return this.prisma.estagiario.update({
      where: { id },
      data: estagiarioData,
    });
  }

  @Delete('estagiarios/:id')
  async deleteEstagiario(@Param('id') id: string): Promise<any> {
    return this.prisma.estagiario.delete({
      where: { id },
    });
  }

  @Post('usuarios')
  async createUsuario(@Body() estagiarioData: CreateUsuarioDto): Promise<any> {
    return this.prisma.estagiario.create({
      data: estagiarioData,
    });
  }

  @Get('usuarios')
  async getUsuario(): Promise<any> {
    return this.prisma.usuario.findMany();
  }

  @Get('usuarios/:id')
  async getUsuarioById(@Param('id') id: string): Promise<any> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario com o ID ${id} não encontrado`);
    }
    return usuario;
  }

  @Put('usuarios/:id')
  async updateUsuario(
    @Param('id') id: string,
    @Body() usuarioData: any,
  ): Promise<any> {
    return this.prisma.usuario.update({
      where: { id },
      data: usuarioData,
    });
  }

  @Delete('usuarios/:id')
  async deleteUsuario(@Param('id') id: string): Promise<any> {
    return this.prisma.usuario.delete({
      where: { id },
    });
  }

  @Post('estagiarios/:estagiarioId/contratos')
  async createContrato(@Body() contratoData: CreateContratoDto): Promise<any> {
    return this.prisma.contrato.create({
      data: contratoData,
    });
  }

  @Get('estagiarios/:id/contratos')
  async getContratoEstagiario(
    @Param('id') estagiarioId: string,
  ): Promise<Contrato[]> {
    return this.prisma.contrato.findMany({
      where: { estagiarioId },
    });
  }

  @Delete('contratos/:id')
  async deleteContrato(@Param('id') id: string): Promise<any> {
    const contrato = await this.prisma.contrato.findUnique({
      where: { id },
    });
    if (!contrato) {
      throw new NotFoundException(`Contrato com o ID ${id} não encontrado`);
    }
    return this.prisma.contrato.delete({
      where: { id },
    });
  }
}
