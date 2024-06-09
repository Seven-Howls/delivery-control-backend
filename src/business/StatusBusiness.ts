import { IStatusData } from "../models/InterfaceStatus";
import { Authenticator } from "../services/Authenticator";
import { CustomError } from "../utils/CustomError";

export class StatusBusiness {
    private statusData: IStatusData;
    private authenticator: Authenticator;

    constructor (statusData: IStatusData) {
        this.statusData = statusData;
        this.authenticator = new Authenticator();
    }

    getAll = async (token: string) => {
        try {
            if(!token) throw new CustomError("Token ausente na autenticação",422);
            const isAuthorized = this.authenticator.getTokenData(token);
            if(!isAuthorized) throw new CustomError("Não autorizado", 401);

            const status = await this.statusData.getAll();
            return status
        } catch (error: any) {
            throw new CustomError(error.message, error.statusCode);
        }
    }
}