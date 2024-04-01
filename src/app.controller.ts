import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { CreateEstagiarioDto } from './dtos/createestagiario';
import { CreateUsuarioDto } from './dtos/createUsusario';
import { CreateContratoDto } from './dtos/createContrato';

@Controller("app")
export class AppController {
  constructor(private prisma: PrismaService) {}

  

  
  @Post("usuarios")
  async createUsuario(@Body() usuarioData: CreateUsuarioDto): Promise<any> { // Usando o DTO
    return this.prisma.usuario.create({
      data: usuarioData,
    });
  }

  
  @Get("usuarios")
  async getUsuarios(): Promise<any> {
    return this.prisma.usuario.findMany();
  }

  @Get("usuarios/:id")
  async getUsuarioById(@Param("id") id: string): Promise<any> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
    });
    if (!usuario) {
      throw new NotFoundException(`Usuário com o ID ${id} não encontrado.`);
    }
    return usuario;
  }

 
  @Put("usuarios/:id")
  async updateUsuario(@Param("id") id: string, @Body() usuarioData: any): Promise<any> {
    return this.prisma.usuario.update({
      where: { id },
      data: usuarioData,
    });
  }

  
  @Delete("usuarios/:id")
  async deleteUsuario(@Param("id") id: string): Promise<any> {
    return this.prisma.usuario.delete({
      where: { id },
    });
  }

  
  @Post("estagiarios")
  async createEstagiario(@Body() estagiarioData: CreateEstagiarioDto): Promise<any> {
    return this.prisma.estagiario.create({
      data: estagiarioData,
    });
  }

 
  @Get("estagiarios")
  async getEstagiarios(): Promise<any> {
    return this.prisma.estagiario.findMany();
  }

  @Get("estagiarios/:id")
  async getEstagiarioById(@Param("id") id: string): Promise<any> {
    const estagiario = await this.prisma.estagiario.findUnique({
      where: { id },
    });
    if (!estagiario) {
      throw new NotFoundException(`Estagiário com o ID ${id} não encontrado.`);
    }
    return estagiario;
  }

  
  @Put("estagiarios/:id")
  async updateEstagiario(@Param("id") id: string, @Body() estagiarioData: any): Promise<any> {
    return this.prisma.estagiario.update({
      where: { id },
      data: estagiarioData,
    });
  }

  
  @Delete("estagiarios/:id")
  async deleteEstagiario(@Param("id") id: string): Promise<any> {
    return this.prisma.estagiario.delete({
      where: { id },
    });
  }

  

  
  @Post("contratos")
  async createContrato(@Body() contratoData: CreateContratoDto): Promise<any> {
    return this.prisma.contrato.create({
      data: contratoData,
    });
  }

  @Get("contratos")
  async getContratos(): Promise<any> {
    return this.prisma.contrato.findMany();
  }

  @Get("contratos/:id")
  async getContratoById(@Param("id") id: string): Promise<any> {
    const contrato = await this.prisma.contrato.findUnique({
      where: { id },
    });
    if (!contrato) {
      throw new NotFoundException(`Contrato com o ID ${id} não encontrado.`);
    }
    return contrato;
  }

  
  @Put("contratos/:id")
  async updateContrato(@Param("id") id: string, @Body() contratoData: any): Promise<any> {
    return this.prisma.contrato.update({
      where: { id },
      data: contratoData,
    });
  }

  
  @Delete("contratos/:id")
  async deleteContrato(@Param("id") id: string): Promise<any> {
    return this.prisma.contrato.delete({
      where: { id },
    });
  }
}
