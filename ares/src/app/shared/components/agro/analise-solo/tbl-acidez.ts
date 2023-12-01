export interface PH_AGUA {
    ph: number,
    classificacao: string,
    implicacoes: string[],
    recomendacao: string
}

export const CLASS_PH_AGUA: PH_AGUA[] = [
    {
        ph: 5.0,
        classificacao: 'Acidez elevada',
        implicacoes: [
            'Baixos teores de Ca, de Mg e de K',
            'Favorece a deficiência de P e ALTA FIXAÇÃO do P aplicado, por íons Fe e Al',
            'Favorece a Toxidez por alumínio (Al), Ferro(Fe) e Manganês(Mn)',
            'Baixa CTC efetiva => alta lixiviação de cátions',
            'Pode ocorrer limitação na decomposição da Matéria orgânica'
        ],
        recomendacao: ''
    },
    {
        ph: 5.9,
        classificacao: 'Acidez média',
        implicacoes: [
            'Baixos teores de Ca, de Mg e de K',
            'Favorece a deficiência de P e ALTA FIXAÇÃO do P aplicado, por íons Fe e Al',
            'Favorece a Toxidez por alumínio (Al), Ferro(Fe) e Manganês(Mn)',
            'Baixa CTC efetiva e alta lixiviação de cátions',
            'Pode ocorrer limitação na decomposição da Matéria orgânica'
        ],
        recomendacao: ''
    },
    {
        ph: 6.9,
        classificacao: 'Acidez fraca',
        implicacoes: [
        ],
        recomendacao: ''
    },
    {
        ph: 7.0,
        classificacao: 'neutra',
        implicacoes: [
        ],
        recomendacao: ''
    },
    {
        ph: 7.8,
        classificacao: 'Alcalinidade fraca',
        implicacoes: [
            'Deficiência de P devido à formação de compostos insolúveis com Ca',
            'Altos teores de Ca, de Mg e de K',
            'Deficiência de micronutrientes',
            'Perda de Nitrogênio por volatilização'
        ],
        recomendacao: ''
    },
    {
        ph: 14,
        classificacao: 'Alcalinidade elevada',
        implicacoes: [
            'Deficiência de P devido à formação de compostos insolúveis com Ca',
            'Altos teores de Ca, de Mg e de K',
            'Deficiência de micronutrientes',
            'Perda de Nitrogênio por volatilização'
        ],
        recomendacao: ''
    },
]