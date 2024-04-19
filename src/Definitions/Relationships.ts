import { Deliveries } from "./Deliveries";
import { Status } from "./Status";

Deliveries.belongsTo(Status, { foreignKey: 'id' , as: 'status_deliveries'})
Status.hasMany(Deliveries,{foreignKey: 'status_id', as: 'deliveries_status'})