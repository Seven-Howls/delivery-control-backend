import { Model } from "sequelize";

interface ITaxaEntrega {
    id: string,
    empresaId: string,
    descricao: string,
    valor: number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null
}

interface TaxaEntregaInstance extends Model<ITaxaEntrega>, ITaxaEntrega { }

export {
    ITaxaEntrega,
    TaxaEntregaInstance
}
