import { DeliveriesBusiness } from "../src/business/DeliveriesBusiness";
import { DeliveriesData } from "../src/data/DeliveriesData";
import { MotoboyData } from "../src/data/MotoboyData";
import { StatusData } from "../src/data/StatusData";
import { PaymentMethodData } from "../src/data/PaymentMethodData";
import { UserTypePermissionsData } from "../src/data/UserTypePermissionsData";
import { CollaboratorData } from "../src/data/CollaboratorData";
import { DeliveryFeeData } from "../src/data/DeliveryFeeData";
import { sequelize } from './SequelizeTest';
import { DataUpdateDelivery, TokenEstatico, DataCreateDelivery } from "./TestData/TestData";


const deliveriesData = new DeliveriesData();
const motoboyData = new MotoboyData();
const statusData = new StatusData();
const deliveryFeeData = new DeliveryFeeData();
const paymentMethodData = new PaymentMethodData();
const userTypePermissionsData = new UserTypePermissionsData();
const collaboratorData = new CollaboratorData();

const deliveriesBusiness = new DeliveriesBusiness(deliveriesData,motoboyData,statusData,deliveryFeeData,paymentMethodData,userTypePermissionsData,collaboratorData);
describe('deliveriesBusiness updateDeliveryStatusById', () => {
    beforeAll(async () => {
        await sequelize.sync()
    });
    it('deve encontrar e atualizar uma entrega', async () => {
        const entregaAtualizada = await deliveriesBusiness.updateDataDeliveryById(TokenEstatico, DataUpdateDelivery);
        expect(entregaAtualizada).toBe("Entrega atualizada com sucesso"); 
    });
    it('Deve criar uma entrega', async ()=>{
        const entregaCriada = await deliveriesBusiness.createDelivery(TokenEstatico, DataCreateDelivery)
        expect(entregaCriada).toEqual(DataCreateDelivery); 
    });
    afterAll(async () => {
        await sequelize.close();
    });
});