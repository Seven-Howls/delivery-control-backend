import { IPermissions } from "../models/InterfacePermissions"

export type TUserTypePermissions = {
    id: string,
    tipoId: string,
    permissaoId: string
    permissions: IPermissions[]
}