import { Model } from "sequelize";

interface IDeliveries {
    id: string,
    taxaEntregaId: string,
    motoboyId: string,
    metodoPagamentoId: string,
    statusId: string,
    valorProduto: number,
    taxaServico: number,
    valorLiquido: number,
    comandaId: number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null
}

interface DeliveriesInstance extends Model<IDeliveries>, IDeliveries { }

export {
    IDeliveries,
    DeliveriesInstance
}
