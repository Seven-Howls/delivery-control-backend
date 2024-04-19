import { IUser } from "./interfaceUser";

export interface IUserData{
    findByCpf(cpf: string): Promise<IUser | null>
}