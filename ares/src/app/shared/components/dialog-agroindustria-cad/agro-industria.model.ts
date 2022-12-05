import { OrigemMp } from "./origem-mp.model"
import { Produto } from "./produto-agroind.model"
import { CondCertificacao } from "./situacao-certificacao.model"
import { TipoAgro } from "./tipo-agro.model"

export interface AgroIndustriaModel {
    produto: Produto,
    mesinicioprod: number,
    mesfimprod: number,
    prdanual: number,
    precoatual: number,//Preço atual por unidade
    situacaocertif: CondCertificacao,
    origemmp: OrigemMp,//Origem da matéria prima(Comprada, produção própria, etc)
    ppmp: number,//produção própria da matéria prima. Representa a quantidade que o produtor processa.
    tipoagro: TipoAgro//Informa se é agroindustria familiar, coletiva ou empresarial
}