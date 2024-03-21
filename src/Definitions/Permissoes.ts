import { Model } from "sequelize";
import { Timestemps } from "./Timestemps";


interface PermissoesInterface extends Timestemps {
    id:string;
    nome:string;
    nivel: number,
}

interface PermissoesInstance extends Model<PermissoesInterface>,PermissoesInterface {}

export{
    PermissoesInterface,
    PermissoesInstance
}
