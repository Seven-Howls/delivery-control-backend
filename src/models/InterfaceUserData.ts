import { IUsuario } from "./interfaceUsuario";

export interface IUserData{
    findByCpf(cpf: string): Promise<IUsuario | null>
}