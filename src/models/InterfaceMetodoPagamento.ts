import { Model } from "sequelize";

interface IMetodoPagamento {
    id: string,
    nome: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null
}

interface MetodoPagamentoInstance extends Model<IMetodoPagamento>, IMetodoPagamento { }

export {
    IMetodoPagamento,
    MetodoPagamentoInstance
}
