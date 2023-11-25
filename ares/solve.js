var solver = require('javascript-lp-solver'),
  results,
  model = {
    "optimize": {
      "preco": "min",
      "k": "min",
    },
    "constraints": {
      "n": { "min": 44 },
      "p": { "min": 50 },
      "k": { "min": 80 }
    },
    "variables": {

      'npk 4 14 8':
      {
        n: 4,
        p: 14,
        k: 8,
        preco: 390
      },
      'npk 4 30 16':
      {
        n: 4,
        p: 30,
        k: 0,
        preco: 195
      },
      'cloreto de pottássio':
      {
        n: 0,
        p: 0,
        k: 58,
        preco: 30
      }

    },
  };


function resolve(model) {
  results = solver.Solve(model);
  console.log(results.vertices);
  return results;

}

resolve(model)
// const fontes = [
//   {
//     descricao: 'npk 4 14 8',
//     n: 4,
//     p: 14,
//     k: 8,
//     preco: 120
//   },
//   {
//     descricao: 'npk 4 30 16',
//     n: 4,
//     p: 30,
//     k: 16,
//     preco: 195
//   },
//   {
//     descricao: 'cloreto de pottássio',
//     n: 0,
//     p: 0,
//     k: 58,
//     preco: 161
//   }
// ]
// const demanda = {
//   n: 100,
//   nc: 40,
//   p: 60,
//   k: 80
// }

// async function resolve(fontes, demanda){
//   console.log('Função para resolver problemas');

//   let hasitem = false;
//   //resolve a primeira demanda de N pengando o primeiro produto da lista, caso não tenha o elemento, vai para o segundo item
//   const q = await fontes.forEach(e => {

//     let qtd;

//     if(e.n && !hasitem){
//       qtd = demanda.n / (e.n/100);
//       // hasitem = true;
//       return qtd;
//     }
//   });

//   const resposne = await q ;

//   console.log(resposne);

// }

// resolve(fontes, demanda);
