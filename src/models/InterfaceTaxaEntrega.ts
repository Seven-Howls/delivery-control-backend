import { Model } from "sequelize";

interface ITaxaEntrega {
    id: string,
    empresaId: string,
    usuarioId: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null
}

interface TaxaEntregaInstance extends Model<ITaxaEntrega>, ITaxaEntrega { }

export {
    ITaxaEntrega,
    TaxaEntregaInstance
}
