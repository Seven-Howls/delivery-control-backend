import { ICompany } from "../models/InterfaceCompany"

export type TCollaboratorAndUser = {
    id: string,
    tipoId: string,
    empresaId: string,
    usuarioId: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null,
    usuarioColaborador: {
        nome: string,
        cpf: string,
        celular: string,
        email: string
    }
}
