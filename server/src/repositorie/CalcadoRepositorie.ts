import prisma from '@database'; // Ajuste conforme seu arquivo index.ts em database
import { Calcado, CreateCalcadoDTO } from '../global/types';

export class CalcadoRepository {
  
  async create(data: CreateCalcadoDTO): Promise<Calcado> {
    return await prisma.calçado.create({
      data,
    });
  }

  async findAll(): Promise<Calcado[]> {
    return await prisma.calçado.findMany();
  }

  async update(id: string, data: Partial<CreateCalcadoDTO>): Promise<Calcado> {
    return await prisma.calçado.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.calçado.delete({
      where: { id },
    });
  }
}