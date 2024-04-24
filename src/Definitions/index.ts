import { Deliveries } from "./Deliveries";
import { Status } from "./Status";
import { Motoboy } from "./Motoboy";
import { Company } from "./Company";
import { User } from "./User";

Deliveries.belongsTo(Status, { foreignKey: 'statusId' , as: 'deliveriesStatus'})
Status.hasMany(Deliveries,{foreignKey: 'statusId', as: 'deliveriesStatus'})

Motoboy.belongsTo(Company,{foreignKey:'empresaId', as: 'motoboyCompany'})
Company.hasMany(Motoboy,{foreignKey:'empresaId', as: 'motoboyCompany'})


export { Deliveries, Status, Motoboy, Company, User}