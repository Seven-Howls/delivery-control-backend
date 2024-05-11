const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    development:{
        dialect: "mysql",
        host: "172.20.0.1",
        port: "3316",
        database: "delivery-control",
        username: "root",
        password: "12345"
    }
};
