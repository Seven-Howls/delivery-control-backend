import { ICompany } from "../models/InterfaceCompany"

export type TCollaboratorAndCompany = {
    id: string,
    tipoId: string,
    empresaId: string,
    usuarioId: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null,
    companys: ICompany[]
}
