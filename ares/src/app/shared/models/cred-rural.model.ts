export interface CredRuralModel {
    banco: string;//banco que concedeu a proposta de financiamento
    linha: string;//linha de crédito
    item: itemfinanciado[],
    modalidade: string;//custeio, investimento
    apltxjuros: string; //Aplicação da tax de juros: Crescente, Decrescente, Price
    anoprimpgm: number;//ano do primeiro pagamento
    anoultpgm: number;//ano do ultimo pagamento
    txjurosaa: number;//taxa de juros ao ano
}

export interface  itemfinanciado{
    finalidade: string;//finalidade do financiamento
    qtditemfinanc: number;//quantidade do item financiado
    valorunit: number;//valor da aquisição deste item

}