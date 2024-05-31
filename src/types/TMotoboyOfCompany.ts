export type TMotoboyOfCompany = {
    [x: string]: any
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
