import { Request, Response } from "express";
import { DeliveriesFeeBusiness } from "../business/DeliveriesFeeBusiness";
import { CustomError } from "../utils/CustomError";
import { TCreateDeliveryFee } from "../types/TCreateDeliveryFee";

export class DeliveriesFeeController {
    private deliveriesFeeBusiness: DeliveriesFeeBusiness;

    constructor(deliveriesFeeBusiness: DeliveriesFeeBusiness) {
        this.deliveriesFeeBusiness = deliveriesFeeBusiness;
    }

    getDeliveryFeeById = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string;
            const deliveryFee =
                await this.deliveriesFeeBusiness.getDeliveryFeeById(
                    req.params.id,
                    token
                );
            res.status(200).send(deliveryFee);
        } catch (error: CustomError | any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    };

    getAllDeliveryFee = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string;
            const empresa_id = req.query.empresa_id as string; 
            if (!empresa_id) {
                throw new CustomError(
                    "Parâmetro empresa_id é obrigatório",
                    400
                );
            }
            const allDeliveriesFee =
                await this.deliveriesFeeBusiness.getAllDeliveriesFee(
                    empresa_id,
                    token
                );
            res.status(200).send(allDeliveriesFee);
        } catch (error: CustomError | any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    };

    createDeliveryFee = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string;
            await this.deliveriesFeeBusiness.createDeliveryFee(
                req.body.descricao,
                req.body.valor,
                req.body.empresaId,
                token
            );
            res.status(200).send("Taxa de Entrega Criada com Sucesso!");
        } catch (error: CustomError | any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    };

    updateDeliveryFee = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string;
            const id = req.params.id;
            const data: TCreateDeliveryFee = req.body;

            await this.deliveriesFeeBusiness.updateDeliveryFee(token,id , data);
            
            res.status(200).send("Taxa de Entrega atualizada com sucesso ");
        } catch (error: CustomError | any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    }
}
