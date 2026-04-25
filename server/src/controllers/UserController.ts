import { Request, Response } from "express";
import prisma from "@database";
import { userRepository } from "src/repositorie/UserRepositorie";

const Urepo = new userRepository();
export class UserControl {

    async createUser(req: Request, res: Response){
        try {

        } catch (error) {
            
        }
    }

    async readAllUsers(req: Request, res: Response) {
        try {

            const users = await prisma.user.findMany();

            if (!users){
                return res.status(404).json({
                    message: "Nenhum usuário criado ainda."
                })
            }

            return res.status(200).json(users)

        } catch (error){
            return res.status(400).json({
                message: "Erro ao buscar usuários",
                error,
            })
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            
        } catch (error) {
            
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            
        } catch (error) {
            
        }
    }

}


