
import { sequelize } from './SequelizeTest';
import {TokenEstatico, dataUserSingUp, loginData, responseLoginMotoboy, updatedData } from "./TestData/TestData";
import { MotoboyBusiness } from "../src/business/MotoboyBusiness";
import { MotoboyData } from '../src/data/MotoboyData';
import { UserData } from '../src/data/UserData';
import { CompanyData } from '../src/data/CompanyData';
import { CollaboratorData } from '../src/data/CollaboratorData';
import { UserTypePermissionsData } from "../src/data/UserTypePermissionsData";

const motoboyData = new MotoboyData();
const userData = new UserData(); 
const companyData = new CompanyData();
const collaboratorData = new CollaboratorData();
const userTypePermissionsData = new UserTypePermissionsData();

const motoboyBusiness = new MotoboyBusiness(motoboyData, userData, companyData, collaboratorData, userTypePermissionsData);
describe('deliveriesFeeBusiness updateDeliveryFeeStatusById', () => {
    beforeAll(async () => {
        await sequelize.sync()
    });
    it('Deve realizar o login do Motoboy', async () => {
        const loginMotoboy = await motoboyBusiness.login("12345678901" , "12345");
        expect(loginMotoboy).toEqual(responseLoginMotoboy); 
    });
    it('Deve realizar a inscrição do Motoboy', async () => {
        const loginMotoboy = await motoboyBusiness.signup(TokenEstatico, dataUserSingUp );
        expect(loginMotoboy).toBe("Motoboy cadastrado com sucesso"); 
    });
    
    it('deve encontrar e atualizar um Motoboy', async ()=>{
        const taxaEntregaCriada = await motoboyBusiness.updateMotoboy(TokenEstatico, updatedData, "2755c622-c39b-4ae7-9c35-db8bd1304c2f")
        expect(taxaEntregaCriada).toBe("Dados do motoboy atualizados com sucesso" ); 
    });
    afterAll(async () => {
        await sequelize.close();
    });
});