import { Request, Response } from "express";
import prisma from "@database";
import { userRepository } from "src/repositorie/UserRepositorie";
import { CreateUserDTO } from "src/global/types";

const Urepo = new userRepository(); //Chamando o repositorio que se comunica com o banco de dados
export class UserControl {

    public createUser = async (req: Request, res: Response) => {
        try {
            const { nome, email, cpf, password } : CreateUserDTO = req.body;

            //Em caso de um dos termos não ter sido inserido
            if (!nome || !email || !cpf || !password) {
                return res.status(400).json({
                    message: "Insira todos os campos do usuário"
                })
            }

            const newUser = await Urepo.create({nome,email,cpf,password});

            //Caso de sucesso
            return res.status(200).json(newUser);

        } catch (error) {
            return res.status(400).json({
                message: "Erro ao criar usuário",
                error
            })
        }
    }

    public readAllUsers = async (req: Request, res: Response) => {
        try {

            //Busca todos os usuários dentro do DB e retorna um array de usuários
            const users = await Urepo.findAll();

            if (users.length == 0){
                return res.status(404).json({
                    message: "Nenhum usuário criado ainda." 
                })
            }

            //Caso de sucesso: retorna todos os usuários no Banco de Dados
            return res.status(200).json(users)

        } catch (error){
            return res.status(400).json({
                message: "Erro ao buscar usuários",
                error,
            })
        }
    }

    public updateUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            //O uso do Partial serve para atualizar apenas alguns dados do usuario
            const dadosAtualizar: Partial<CreateUserDTO> = req.body;

            const UserAtualizado = await Urepo.update(id, dadosAtualizar);

            return res.status(200).json(UserAtualizado);

        } catch (error) {
            return res.status(404).json({
                message: "Erro ao atualizar o usuário",
            })
        }
    }

    public deleteUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            await Urepo.delete(id);
            return res.status(200).json({
                message: "Usuario deletado com sucesso",
            })

        } catch (error) {
            return res.status(404).json({
                message: "Erro ao deletar o usuário",
            })
        }
    }
}
