import { User } from "../Definitions/index";
import { IUser, IUserData } from "../models/interfaceUser";
import { Op } from "sequelize";
import { TCreateUserData } from "../types/TCreateUserData";
import { v4 as uuid4 } from "uuid";
import { TUpdateUser } from "../types/TUpdateUser";
import { generateUuid } from "../utils/generateUuid";

export class UserData implements IUserData {
    private user: typeof User

    constructor() {
        this.user = User;
    }
    findByCpf = async (cpf: string, deleted = false): Promise<IUser | null> => {
        try {
            const userQuery: any = {
                where: {
                    cpf
                }
            }

            if(!deleted) userQuery.where.deletedAt = { [Op.is]: null}
            const user = this.user.findOne(userQuery);

            return user;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    findById = async (id: string): Promise<IUser | null> => {
        try {
            const user = this.user.findOne({
                attributes: {
                    exclude: ['createdAt','deletedAt','updatedAt','senha']
                },
                where: {
                    id,
                    deletedAt: {
                        [Op.is]: null
                    }
                }
            });

            return user;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    insertUser = async (data: TCreateUserData): Promise<IUser | null> => {
        try {
            console.log({
                id: generateUuid(),
                celular: data.celular,
                cpf: data.cpf,
                nome: data.nome,
                senha: data.password,
                email: data.email,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            const user = await this.user.create({
                id: generateUuid(),
                celular: data.celular,
                cpf: data.cpf,
                nome: data.nome,
                senha: data.password,
                email: data.email,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            console.log(user)
            await user.save();

            return user;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    updateUser = async (data: TUpdateUser): Promise<void> => {
        try {
            const user = await this.user.update(data, {
                where: {
                    id: data.id
                }
            })
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
