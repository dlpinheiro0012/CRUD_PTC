import { Request, Response } from "express";
import prisma from "@database";
import { userRepository } from "src/repositorie/UserRepositorie";
import { CreateUserDTO } from "src/global/types";

/**
Nesse arquivo de controle, eu separei cada uma das funções que se comunciam
 com o usuário dentro de uma classe, compartimentalizando-as nela de forma
 assincrona, para não ter delay quando forem chamadas e quebrar o programa 
 caso alguma não responda imdeiatamente. A mesma lógica usada para o CRUD dos
 usuários foi usada no CRUD dos calçados. 
 */

const Urepo = new userRepository(); //Chamando o repositorio que se comunica com o banco de dados
export class UserControl {

    async createUser(req: Request, res: Response){
        try {
            const { nome, email, cpf, password} : CreateUserDTO = req.body;

            const newUser = await Urepo.create({nome,email,cpf,password});

            //Em caso de um dos termos não ter sido inserido
            if (!nome || !email || !cpf || !password) {
                return res.status(404).json({
                    message: "Insira todos os campos do usuário"
                })
            }
            //Caso de sucesso
            return res.status(200).json(newUser);

        } catch (error) {
            return res.status(400).json({
                message: "Erro ao criar usuário",
                error
            })
        }
    }

    async readAllUsers(req: Request, res: Response) {
        try {

            //Busca todos os usuários dentro do DB
            const users = await prisma.user.findMany();

            if (!users){
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

    async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(404).json({
                    message: "Id não identificado corretamente",
                })
            }

            //O uso do Partial serve para atualizar apenas alguns dados do usuario
            const dadosAtualizar: Partial<CreateUserDTO> = req.body;

            const UserAtualizado = Urepo.update(id, dadosAtualizar);

            if (!UserAtualizado) {
                return res.status(404).json({
                    message: "Erro nos dados de atualização do usuário"
                })
            }

            return res.status(200).json(UserAtualizado);

        } catch (error) {
            return res.status(404).json({
                message: "Erro ao atualizar o usuário",
            })
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(404).json({
                    message: "Id não identificado",
                })
            }

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
