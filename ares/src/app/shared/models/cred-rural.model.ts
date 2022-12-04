import { Itemfinanciavel } from "../components/dialog-cred-rural-cad/model/item-financiaveis.model";

export interface CredRuralModel {
    banco: string;//banco que concedeu a proposta de financiamento
    linha: string;//linha de crédito
    itens: itemfinanciado[],
    anoprimpgm: Date;//ano do primeiro pagamento
    anoultpgm: Date;//ano do ultimo pagamento
    txjurosaa: number;//taxa de juros ao ano
}
  
export interface  itemfinanciado{
    finalidade: Itemfinanciavel;//finalidade do financiamento
    atividade: string;//finalidade do financiamento
    descricao: string;//finalidade do financiamento
    unidade: string;//finalidade do financiamento
    qtditemfinanc: number;//quantidade do item financiado
    valorunit: number;//valor da aquisição deste item
}