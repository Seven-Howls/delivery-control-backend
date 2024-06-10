import { CollaboratorBusiness } from '../src/business/CollaboratorBusiness';
import { UserData } from "../src/data/UserData";
import { CollaboratorData } from "../src/data/CollaboratorData";
import { UserTypePermissionsData } from "../src/data/UserTypePermissionsData";
import { CompanyData } from "../src/data/CompanyData";
import { UserTypeData } from "../src/data/UserTypeData";
import { sequelize } from './SequelizeTest';
import { dataUserSingUp, loginData, updatedData } from './TestData/TestData';
import { expectedLoginObject } from './TestType/TestTypes';

const collaboratorBusiness = new CollaboratorBusiness(new UserData(), new CollaboratorData(), new UserTypePermissionsData(), new CompanyData(), new UserTypeData());

describe('CollaboratorBusiness - login', () => {
    beforeAll(async () => {
        await sequelize.sync()
    });

    it('Deve Retornar um objeto json contendo as informações do Colaborador e  token', async () => {
        const [token, collaboratorData] = await collaboratorBusiness.login(loginData);
        const receivedResponse = { token, dataCollaborator: collaboratorData };
        const receivedResponseObj = JSON.parse(JSON.stringify(receivedResponse));
        expect(receivedResponseObj).toEqual(expectedLoginObject);
    });

    it('Deve atualizar os dados do Colaborador', async () => {
        const  [token, loginResponse] = await collaboratorBusiness.login(loginData);
        const loginResponseObj = JSON.parse(JSON.stringify(loginResponse));
        const tokenString = JSON.stringify(token);
        const collaboratorId = loginResponseObj.id;
        const updateResponse = await collaboratorBusiness.update(JSON.parse(tokenString),updatedData,collaboratorId);
        expect(updateResponse).toBeUndefined;
    });
    
    it('Deve criar o Login de Um Colaborador', async () => {
        const [token, loginResponse] = await collaboratorBusiness.login(loginData);
        const tokenString = JSON.stringify(token);
        const colaboradorCriado = await collaboratorBusiness.signup(dataUserSingUp, JSON.parse(tokenString));
        expect(colaboradorCriado).toBeUndefined();
    });

    afterAll(async () => {
        await sequelize.close();
    });
});
