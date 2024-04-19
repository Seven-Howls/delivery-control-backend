import { Model, Op } from "sequelize";
import { Deliveries } from "../definitions/Deliveries";
import { IDeliveries } from "../models/InterfaceDeliveries";
import { IDeliveriesData } from "../models/InterfaceDeliveriesData";
import { Status } from "../definitions/Status";

export class DeliveriesData implements IDeliveriesData {
    private deliveries: typeof Deliveries

    constructor(){
        this.deliveries = Deliveries
    }
    
    async findInProgressDeliveriesByMotoboy(motoboyId: string): Promise<IDeliveries[] | null> {
        try{

            const inProgressDeliveries =  await this.deliveries.findAll({
                where:{
                    statusId : 'd7d3207a-cfbc-4470-ada3-295ee46747c1',
                    motoboyId,
                    deletedAt: {
                        [Op.is]: null
                    }
                },
                include:[
                    {
                        model: Status,
                        as: 'status_deliveries'
                    }
                ]
            });

            return inProgressDeliveries;
        }catch(error: any){
            throw new Error(error.message);
        }
    }
}