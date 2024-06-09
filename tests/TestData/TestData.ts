import { TLoginData } from "../../src/types/TLoginData";

export const loginData: TLoginData = {
    cpf: '23456789018',
    password: '12345',
    companyId: 'b3be5015-09e0-41aa-9a11-bd2ed2dea8bd'
};

export const updatedData= {
    nome: "Thenmarques",
    email: "novoemail2@exemplo.com",
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
    typeId: "61c8de4a-d05b-4c54-b18f-1f685cb6a41f"
};
;
