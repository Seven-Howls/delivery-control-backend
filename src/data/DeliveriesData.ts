import { Op, QueryTypes } from "sequelize";
import { Deliveries, DeliveryFee, Motoboy, PaymentMethod, Status } from "../Definitions/index";
import { IDeliveries, IDeliveriesData } from "../models/InterfaceDeliveries";
import { THistoryDeliveries } from "../types/THistoryDeliveries";
import { selectHistoryDeliveries } from "../database/querys/selectHistoryDeliveries";
import { selectHistoryDeliveriesFull } from "../database/querys/selectHistoryDeliveriesFull";
import { v4 as uuid4 } from "uuid";
import { TDeliveryCreated } from "../types/TDeliveryCreated";
import { THistoryDeliveriesFull, THistoryDeliveriesFullPagination } from "../types/THistoryDeliveriesFull";
import { generateUuid } from "../utils/generateUuid";
import { TDataUpdateDeliveries } from "../types/TDataUpdateDeliveries";
import { All_entregas, numero_entregas, selectHistoryDeliveryAll } from "../database/querys/selectHistoryDeliveryAll";

export class DeliveriesData implements IDeliveriesData {
    private deliveries: typeof Deliveries;

    constructor() {
        this.deliveries = Deliveries;
    }
    getDeliveryByIdAndMotoboy = async (
        id: string,
        motoboyId: string
    ): Promise<IDeliveries | null> => {
        try {
            const delivery = await this.deliveries.findOne({
                where: {
                    id,
                    motoboyId,
                    deletedAt: {
                        [Op.is]: null,
                    },
                },
            });

            return delivery;
        } catch (error: any) {
            throw new Error(error.message);
        }
    };
    findById = async (id:string): Promise<IDeliveries | null> => {
        try {
            const delivery = await this.deliveries.findOne({
                where: {
                    id,
                    deletedAt: {
                        [Op.is]: null,
                    },
                },
            });

            return delivery;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    findStatusInProgressByMotoboy = async (
        motoboyId: string
    ): Promise<IDeliveries[] | null> => {
        try {
            const inProgressDeliveries = await this.deliveries.findAll({
                attributes: {
                    exclude: [
                        "deletedAt",
                        "updatedAt",
                        "createdAt",
                        "statusId",
                    ],
                },
                where: {
                    statusId: 1,
                    motoboyId,
                    deletedAt: {
                        [Op.is]: null,
                    },
                },
                include: [
                    {
                        model: Status,
                        as: "deliveriesStatus",
                        attributes: ["id", "nome", "nivel"],
                    },
                ],
            });

            return inProgressDeliveries;
        } catch (error: any) {
            throw new Error(error.message);
        }
    };
    findHistoryByMotoboy = async (
        motoboyId: string
    ): Promise<THistoryDeliveries[] | null | undefined> => {
        try {
            const history: THistoryDeliveries[] =
                (await this.deliveries.sequelize?.query(
                    selectHistoryDeliveries,
                    {
                        type: QueryTypes.SELECT,
                        replacements: { motoboyId },
                    }
                )) as THistoryDeliveries[];
            return history;
        } catch (error: any) {
            throw new Error(error.message);
        }
    };
    findHistoryByMotoboyFUll = async (
        motoboyId: string
    ): Promise<THistoryDeliveriesFull[] | null> => {
        try {
            const history: THistoryDeliveriesFull[] =
                (await this.deliveries.sequelize?.query(
                    selectHistoryDeliveriesFull,
                    {
                        type: QueryTypes.SELECT,
                        replacements: { motoboyId },
                    }
                )) as THistoryDeliveriesFull[];
            return history;
        } catch (err: any) {
            throw new Error(err.message);
        }
    };
    findHistoryFUll = async (companyId: string, page: number, perPage: number): Promise<THistoryDeliveriesFullPagination | null> => {
        try {
            const offset = (page - 1) * perPage;
            const {count, rows} = await this.deliveries.findAndCountAll({
                where: {
                    deletedAt: {
                        [Op.is]: null,
                    }
                },
                attributes: ['id','valorProduto','taxaServico','valorLiquido','comandaId','createdAt','updatedAt'],
                include: [
                    {
                        model: Motoboy,
                        as: 'motoboy',
                        attributes: ['id','usuarioId','empresaId'],
                        where: {
                            empresaId: companyId
                        }
                    },
                    {
                        model: Status,
                        as: "deliveriesStatus",
                        attributes: ['id','nivel','nome']
                    },
                    {
                        model: DeliveryFee,
                        as: 'taxaEntrega',
                        attributes: ['id', 'valor', 'descricao']
                    },
                    {
                        model: PaymentMethod,
                        as: 'metodoPagamento',
                        attributes: ['id','nome']
                    }
                ],
                offset,
                limit: perPage,
                order: [['createdAt','ASC']]
            })

            return {
                entregas: rows,
                page,
                perPage,
                total: count } as unknown as THistoryDeliveriesFullPagination;
        } catch (err: any) {
            throw new Error(err.message);
        }
    };
    updateStatusDeliveryById = async (
        deliveryId: string,
        statusId: string
    ): Promise<void> => {
        try {
            this.deliveries.update(
                {
                    statusId,
                },
                {
                    where: {
                        id: deliveryId,
                    },
                }
            );
        } catch (error: any) {
            throw new Error(error.message);
        }
    };
    insertDelivery = async (
        delivery: TDeliveryCreated
    ): Promise<IDeliveries | null> => {
        try {
            const newDelivery = await this.deliveries.create({
                id: generateUuid(),
                taxaEntregaId: delivery.deliveryFeeId,
                motoboyId: delivery.motoboyId,
                metodoPagamentoId: delivery.paymentMethodId,
                statusId: delivery.statusId,
                valorProduto: delivery.productValue,
                taxaServico: delivery.serviceFee,
                valorLiquido: delivery.equityValue as number,
                comandaId: delivery.commandId,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            await newDelivery.save();

            return newDelivery;
        } catch (error: any) {
            throw new Error(error.message);
        }
    };
    updateDataDeliveryById = async (
        data: TDataUpdateDeliveries
    ): Promise<void> => {
        try {
            this.deliveries.update(
                {
                    taxaEntregaId: data.deliveryFeeId,
                    motoboyId: data.motoboyId,
                    metodoPagamentoId: data.methodPaymentId,
                    statusId: data.statusId,
                    taxaServico: data.serviceFee,
                    valorProduto: data.productValue,
                    valorLiquido: data.equityValue,
                    comandaId: data.comandId,
                },
                {
                    where: {
                        id: data.id,
                    },
                }
            );
        } catch (error: any) {
            throw new Error(error.message);
        }
    };
}
