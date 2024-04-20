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
                attributes:{
                    exclude:['deletedAt','updatedAt','createdAt','statusId']
                },
                where:{
                    statusId : 1,
                    motoboyId,
                    deletedAt: {
                        [Op.is]: null
                    }
                },
                include:[
                    {
                        model: Status,
                        as: 'deliveriesStatus',
                        attributes: ['id','nome','nivel']
                    }
                ]
                
            });

            return inProgressDeliveries;
        }catch(error: any){
            throw new Error(error.message);
        }
    }
}