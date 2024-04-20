import { Deliveries } from "./Deliveries";
import { Status } from "./Status";

Deliveries.belongsTo(Status, { foreignKey: 'statusId' , as: 'deliveriesStatus'})
Status.hasMany(Deliveries,{foreignKey: 'statusId', as: 'deliveriesStatus'})


export { Deliveries, Status}