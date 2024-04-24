import { Op, QueryTypes } from "sequelize";
import { Deliveries, Status } from "../Definitions/index";
import { IDeliveries, IDeliveriesData} from "../models/InterfaceDeliveries";
import { THistoryDeliveries } from "../types/THistoryDeliveries";
import { selectHistoryDeliveries } from "../database/querys/selectHistoryDeliveries";

export class DeliveriesData implements IDeliveriesData {
    private deliveries: any

    constructor(){
        this.deliveries = Deliveries
    }
    getDeliveryByIdAndMotoboy = async (id: string, motoboyId: string): Promise<IDeliveries | null> => {
        try {
            const delivery = await this.deliveries.findOne({
                where: {
                    id,
                    motoboyId,
                    deletedAt: {
                        [Op.is]: null
                    }
                }
            })

            return delivery
        } catch(error: any){
            throw new Error(error.message);
        }
    }
    findStatusInProgressByMotoboy = async (motoboyId: string): Promise<IDeliveries[] | null> => {
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
    findHistoryByMotoboy = async (motoboyId: string): Promise< THistoryDeliveries[] | null | undefined> => {
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

    updateStatusDeliveryById = async (deliveryId: string, statusId: string): Promise< void > => {
        try {
            this.deliveries.update({
                statusId
            },{
                where: {
                    id: deliveryId
                }
            })
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}