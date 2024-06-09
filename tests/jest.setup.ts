import { sequelize } from './SequelizeTest';

beforeAll(async () => {
    await sequelize.authenticate();
});

afterAll(async () => {
    await sequelize.close();
});
