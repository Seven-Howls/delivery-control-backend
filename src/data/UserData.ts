import { User } from "../Definitions/index";
import { IUser, IUserData } from "../models/interfaceUser";
import { Op } from "sequelize";
import { TSignupUserData } from "../types/TSignupUserData";
import { v4 as uuid4 } from "uuid";
import { TUpdateUser } from "../types/TUpdateUser";

export class UserData implements IUserData {
    private user: typeof User

    constructor() {
        this.user = User;
    }
    findByCpf = async (cpf: string, deleted = false): Promise<IUser | null> => {
        try {
            const userQuery: any = {
                attributes: ['id', 'senha'],
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
                attributes: ['id', 'nome'],
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

    insertUser = async (data: TSignupUserData): Promise<IUser | null> => {
        try {
            const user = await this.user.create({
                id: uuid4(),
                celular: data.celular,
                cpf: data.cpf,
                nome: data.nome,
                senha: data.password,
                createdAt: new Date(),
                updatedAt: new Date()
            })
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
