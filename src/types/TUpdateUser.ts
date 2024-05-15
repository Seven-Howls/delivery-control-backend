export type TUpdateUser = {
    id?: string,
    nome?: string,
    cpf?: string,
    password?: string,
    celular?: number,
    email?:string,
    deletedAt?: Date | null
}
