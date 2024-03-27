import { Model } from "sequelize";

interface IEntregas {
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

interface EntregasInstance extends Model<IEntregas>, IEntregas { }

export {
    IEntregas,
    EntregasInstance
}
