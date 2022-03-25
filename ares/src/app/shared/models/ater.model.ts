export interface AterModel {
    local: string,
    situacao: string;
    recomendacao: string;
    orientacao: string;
    customers: CustomerModel[];
}
export interface CustomerModel{
    name: string,
    nickname: string,
    cpf: string,
    birth_date: Date,
    address: string,
    num: string,
    district: string,
    complement: string,
    cep: string,
    phone: string,
    city: string,
    schooling: string
}