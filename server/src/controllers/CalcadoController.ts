import { Request, Response } from "express";
import prisma from "@database";
import { CalcadoRepository } from "src/repositorie/CalcadoRepositorie";

const Calrepo = new CalcadoRepository();

export class CalcadoControl {

    async createCalcado(req: Request, res: Response) {
        try {
            
        } catch (error) {
            
        }
    }

    async readAllCalcados(req: Request, res: Response) {
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

    async updateCalcado(req: Request, res: Response) {
        try {
            
        } catch (error) {
            
        }
    }

    async deleteCalcado(req: Request, res: Response) {
        try {
            
        } catch (error) {
            
        }
    }
}