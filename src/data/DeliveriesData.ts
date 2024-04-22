import { Model, Op, QueryTypes } from "sequelize";
import { Deliveries, Status } from "../definitions/index";
import { IDeliveries } from "../models/InterfaceDeliveries";
import { IDeliveriesData } from "../models/InterfaceDeliveriesData";
import { THistoryDeliveries } from "../types/THistoryDeliveries";
import { selectHistoryDeliveries } from "../database/querys/selectHistoryDeliveries";

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
    async findHistoryByMotoboy(motoboyId: string): Promise< THistoryDeliveries[] | null | undefined> {
        try{
            const history: THistoryDeliveries[] = await this.deliveries.sequelize?.query(
                selectHistoryDeliveries,
                {
                    type: QueryTypes.SELECT,
                    replacements: { motoboyId }
                }
            ) as THistoryDeliveries[];
            return history
        }catch(error: any) {
            throw new Error(error.message);
        }
    }

    async updateStatusDelivery(deliveryId: string, statusId:string): Promise< void > {

    }
}