import prisma from '@database'; // Ajuste conforme seu arquivo index.ts em database
import { CreateUserDTO, User } from '../global/types';

export class userRepository {

    async create(data: CreateUserDTO) : Promise<User> {
        return await prisma.user.create({
            data,
        });
    }

    async findAll(): Promise<User[]> {
        return await prisma.user.findMany();
  }

    async update(id: string, data: Partial<CreateUserDTO>): Promise<User> {
        return await prisma.user.update({
            where: { id }, data,
        });
  }

    async delete(id: string): Promise<void> {
        await prisma.user.delete({
        where: { id },
        });
    }
}