import { Deliveries } from "./Deliveries";
import { Motoboy } from "./Motoboy";
import { User } from "./User";
import { Company } from "./Company";
import { Status } from "./Status";

Deliveries.belongsTo(Status, { foreignKey: 'statusId' , as: 'deliveriesStatus'})
Status.hasMany(Deliveries,{foreignKey: 'statusId', as: 'deliveriesStatus'})

Motoboy.belongsTo(Company,{foreignKey:'empresaId', as: 'motoboyCompany'})
Company.hasMany(Motoboy,{foreignKey:'empresaId', as: 'motoboyCompany'})


export { Deliveries, Status, Motoboy, Company, User}