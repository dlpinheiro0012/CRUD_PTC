import { Request, Response } from "express";
import prisma from "@database";
import { CalcadoRepository } from "src/repositorie/CalcadoRepositorie";
import { CreateCalcadoDTO } from "src/global/types";

const Calrepo = new CalcadoRepository();

export class CalcadoControl {

    public createCalcado = async (req: Request, res: Response) => {
        try {

            const { nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque } : CreateCalcadoDTO = req.body;

            //Em caso de um dos termos não ter sido inserido
            if (!nome_produto || !cor || !marca || !tamanho || !preco || !quantidade_em_estoque) {
                return res.status(404).json({
                    message: "Insira todos os campos do calçado"
                })
            }

            const newCalcado= await Calrepo.create({nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque});

            //Caso de sucesso
            return res.status(200).json(newCalcado);
            
        } catch (error) {
            return res.status(400).json({
                message: "Erro ao criar Calçado.",
                error
            })
        }
    }

    public readAllCalcados = async (req: Request, res: Response) => {
        try {
            
            const calcados = await prisma.calcado.findMany();

            if (!calcados) {
                return res.status(404).json({
                    message: "Nenhum calçado registrado"
                })
            }

            return res.status(200).json(calcados)

        } catch (error) {
            return res.status(200).json({
                message: "Erro ao buscar calçados.",
                error,
            })
        }
    }

    public updateCalcado = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(404).json({
                    message: "Insira um Id válido.",
                })
            }

            const dadosAtualizar : Partial<CreateCalcadoDTO> = req.body;

            const calcadoAtualizado = await Calrepo.update(id, dadosAtualizar);

            if (!calcadoAtualizado) {
                return res.status(404).json({
                    message: "Erro nos dados de atualização do calçado"
                })
            }

            return res.status(200).json(calcadoAtualizado);

        } catch (error) {
            return res.status(404).json({
                message: "Erro ao atualizar o calçado.",
                error
            })
        }
    }

    public deleteCalcado = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(404).json({
                    message: "Id não identificado",
                })
            }

            await Calrepo.delete(id);
            return res.status(200).json({
                message: "Calçado deletado com sucesso"
            })

        } catch (error) {
            return res.status(404).json({
                message: "Erro ao deletar calçado.",
                error
            })
        }
    }
}