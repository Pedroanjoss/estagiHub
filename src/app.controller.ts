import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';

@Controller("app")
export class AppController {
  constructor(private prisma: PrismaService) {

  }

  @Get("hello")
  async getHello(): Promise<any>  {
   const user = await this.prisma.estagiario.create({
     data: {
      
      email : "teste@teste3",
      senha : "wee",
      status: "Ativo",
      telefone: "123",



     }
     
   })
   return user;
  }
}
