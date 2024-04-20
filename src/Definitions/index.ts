import { Deliveries } from "./Deliveries";
import { Status } from "./Status";

Deliveries.belongsTo(Status, { foreignKey: 'id' , as: 'deliveries_status'})
Status.hasMany(Deliveries,{foreignKey: 'statusId', as: 'deliveries_status'})


export { Deliveries, Status}