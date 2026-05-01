import prisma from '@database'; // Ajuste conforme seu arquivo index.ts em database
import { Calcado, CreateCalcadoDTO } from '../global/types';

export class CalcadoRepository {
  
  async create(data: CreateCalcadoDTO): Promise<Calcado> {
    return await prisma.calcado.create({
      data, 
    });
  }

  async findAll(): Promise<Calcado[]> {
    return await prisma.calcado.findMany();
  }

  async findBySize(size: number) : Promise<Calcado[]> {
    return await prisma.calcado.findMany({
      where: { 
        tamanho: size 
      },
    });
  }

  async update(id: number, data: Partial<CreateCalcadoDTO>): Promise<Calcado> {
    return await prisma.calcado.update({
      where:  id ,
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.calcado.delete({
      where: { id },
    });
  }
}