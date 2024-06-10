import { TLoginData } from "../../src/types/TLoginData";

const companyId = '16dfebfd-546f-4684-8cdf-fd42e4339165';
const typeId = "df9e5a2c-00e9-4d28-aed3-2c4d887743e6"
export let TokenEstatico = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAyYTI1NzBlLTVmZjgtNDExZC1hOTgyLTZkODE3ZmQ0NzNkYiIsImNvbXBhbnlJZCI6IjE2ZGZlYmZkLTU0NmYtNDY4NC04Y2RmLWZkNDJlNDMzOTE2NSIsInJvbGVJZCI6IjlkZGI0MTc3LTBlNTgtNDVkMS04Y2M0LWQzZmNkZGUxY2E0OSIsImlhdCI6MTcxNzk3ODUzOSwiZXhwIjoxNzE3OTgyMDc5fQ.MHzyyFTxqE2-CJaAnJ3Cwa8bfW87nt4SqsoIsq3fTKQ";
 export const loginData: TLoginData = {
    cpf: '23456789016',
    password: '12345',
    companyId: companyId
};

export const DataUpdateDelivery = {
    id: "0109e9ef-9ee8-437b-91df-c8775179b3f5",
    statusId: "2",
    motoboyId: "2755c622-c39b-4ae7-9c35-db8bd1304c2f",
    comandId: 459,
    deliveryFeeId: "0224a854-d085-48dd-9e7c-e7d5eb590e4f",
    serviceFee: 5,
    productValue: 95,
    paymentMethodId: "cbf9c72f-1dc6-40a6-9c72-3f9aae4ae828"
};


export const updatedData= {
    nome: "Thenmarques",
    email: generateRandomEmail(),
};
function generateRandomEmail() {
    const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let string = '';
    for(let ii=0; ii<15; ii++){
        string += chars[Math.floor(Math.random() * chars.length)];
    }
    return string + "@gmail.com";
}

function generateRandomCPF() {
    let cpf = '';
    for(let ii=0; ii<11; ii++){
        cpf += Math.floor(Math.random() * 10); 
    }
    return cpf;
}

export const dataUserSingUp = {
    nome: "Test Jest",
    cpf: generateRandomCPF(),
    password: "12345",
    celular: 32934280255,
    email: generateRandomEmail(),
    typeId: typeId
};
;
