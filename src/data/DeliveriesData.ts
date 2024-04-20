import { Model, Op } from "sequelize";
import { Deliveries, Status } from "../definitions/index";
import { IDeliveries } from "../models/InterfaceDeliveries";
import { IDeliveriesData } from "../models/InterfaceDeliveriesData";

export class DeliveriesData implements IDeliveriesData {
    private deliveries: typeof Deliveries

    constructor(){
        this.deliveries = Deliveries
    }
    
    async findStatusInProgressByMotoboy(motoboyId: string): Promise<IDeliveries[] | null> {
        try{
            const inProgressDeliveries =  await this.deliveries.findAll({
                where:{
                    statusId : '7741ce1b-57e5-4bae-8c8d-c5fbaa769286',
                    motoboyId,
                    deletedAt: {
                        [Op.is]: null
                    }
                },
                include:[
                    {
                        model: Status,
                        as: 'deliveries_status'
                    }
                ]
            });

            return inProgressDeliveries;
        }catch(error: any){
            throw new Error(error.message);
        }
    }
}