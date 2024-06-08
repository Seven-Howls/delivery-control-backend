export type TMotoboyOfCompanyPagination = {
    motoboy: TMotoboyOfCompany[],
    page: number,
    perPage: number,
    total: number
    
} 

export type TMotoboyOfCompany = {
    toJSON(): any
    id: string,
    token?: string,
    empresaId: string,
    usuarioId: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null
    motoboyCompany: {
        id: string,
        nomeFantasia: string
    },
    usuario: {
        nome:string,
        cpf: string,
        celular: string,
        email: string
    }
} 
