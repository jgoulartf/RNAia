import{ RNA } from './RNA.mjs';
import { Matriz } from './Matriz.mjs';

let rna = new RNA(2, 3, 1);
let train = true;

// XOR problem
let dataset = {
  inputs:
    [[1, 1],
     [1, 0],
     [0, 1],
     [0, 0]
    ],
  outputs:
    [[0],
     [1],
     [1],
     [0]]
};

// testando se rede ta funcionando
function training() {
  console.log("Iniciando treino...\n\n");
  if(train) {
    for(let i = 0; i < 10000; i++) {
      let index = Math.floor(Math.random());
      rna.train(dataset.inputs[index], dataset.outputs[index])
    }

    if(rna.predict([0, 0])[0] < 0.04 && rna.predict([1, 0])[0] > 0.98){
      train = false;
      console.log("Treino finalizado...\n\n");
    }

  }

}

function testing() {
  console.log("ESPERADO --> [1, 1] --> [0]");
  console.log("OBTIDO   -->", rna.predict([1, 1]));

  console.log("ESPERADO --> [1, 0] --> [1]");
  console.log("OBTIDO   -->", rna.predict([1, 0]));
}

  training();

