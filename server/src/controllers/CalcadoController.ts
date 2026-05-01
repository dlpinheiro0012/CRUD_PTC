import { Request, Response } from "express";
import { CalcadoRepository } from "src/repositorie/CalcadoRepositorie";
import { CreateCalcadoDTO } from "src/global/types";

const Calrepo = new CalcadoRepository();

//Todos os comentários e explicações acerca da motivação tomada para os códigos estão no documento enviado
export class CalcadoControl {

    public createCalcado = async (req: Request, res: Response) => {
        try {

            const { nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque } : CreateCalcadoDTO = req.body;

            //Em caso de um dos termos não ter sido inserido
            if (!nome_produto || !cor || !marca || !tamanho || !preco || !quantidade_em_estoque) {
                return res.status(400).json({
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
            
            const calcados = await Calrepo.findAll();

            if (calcados.length == 0) {
                return res.status(404).json({
                    message: "Nenhum calçado registrado"
                })
            }

            return res.status(200).json(calcados)

        } catch (error) {
            return res.status(400).json({
                message: "Erro ao buscar calçados.",
                error,
            })
        }
    }

    public readBySize = async (req: Request, res: Response) => {
        try {

            const size  = Number(req.params.tamanho);

            if (isNaN(size)) {
                return res.status(404).json({
                    message: "Insira um numero para o tamanho buscado."
                })
            };
            const calcados = await Calrepo.findBySize(size);

            if (calcados.length == 0) {
                return res.status(404).json({
                    message: "Nenhum calçado com o tamanho citado foi encontrado."
                })
            }

            return res.status(200).json(calcados);

        } catch (error) {
            return res.status(400).json({
                message: "Erro ao buscar calçados.",
                error
            })
        }
    }

    public updateCalcado = async (req: Request, res: Response) => {
        try {
            const id  = Number(req.params.id);

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