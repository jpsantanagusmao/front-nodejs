export interface Action {
    description: string;
    referency: string;
    qtdAtendimentos: number;
    valorPorAtendimento: number;
    objetivo: string;
    start: string;
    end: string;
}

export interface Project {
    description: string;
    objetivo: string;
    publicoAlvo: string;
    justificativa: string;
    resultado: string;
    city: string;
    representative_id: string;
    actions: Action[];
}
