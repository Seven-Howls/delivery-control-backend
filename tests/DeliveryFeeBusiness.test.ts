
import { UserTypePermissionsData } from "../src/data/UserTypePermissionsData";
import { DeliveryFeeData } from "../src/data/DeliveryFeeData";
import { sequelize } from './SequelizeTest';
import { DataUpdateDeliveryFee, TokenEstatico } from "./TestData/TestData";
import { DeliveriesFeeBusiness } from "../src/business/DeliveriesFeeBusiness";
import { CompanyData } from "../src/data/CompanyData";


const userTypePermissionsData = new UserTypePermissionsData();
const deliveriesFeeData = new DeliveryFeeData();
const companyData = new CompanyData();

const deliveriesFeeBusiness = new DeliveriesFeeBusiness(deliveriesFeeData,  companyData, userTypePermissionsData, );
describe('deliveriesFeeBusiness updateDeliveryFeeStatusById', () => {
    beforeAll(async () => {
        await sequelize.sync()
    });
    it('deve encontrar e atualizar uma taxa entrega', async () => {
        const taxaEntregaAtualizada = await deliveriesFeeBusiness.updateDeliveryFee(TokenEstatico, "0224a854-d085-48dd-9e7c-e7d5eb590e4f", DataUpdateDeliveryFee);
        expect(taxaEntregaAtualizada).toBe("Taxa de Entrega atualizada com sucesso "); 
    });
    it('Deve criar uma taxa entrega', async ()=>{
        const taxaEntregaCriada = await deliveriesFeeBusiness.createDeliveryFee("teste", 100, TokenEstatico)
        expect(taxaEntregaCriada).toBe("Taxa de Entrega Criada com Sucesso!"); 
    });
    afterAll(async () => {
        await sequelize.close();
    });
});