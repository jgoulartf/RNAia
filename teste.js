import{RNA} from './RNA.mjs';
import { Matriz } from './Matriz.mjs';

let dataset = {
  numbers : [
    [ 0, 1, 1, 0,
      1, 0, 0, 1,
      1, 0, 0, 1,       // 0
      1, 0, 0, 1,
      0, 1, 1, 0
    ],
    [ 0, 1, 0, 0,
      1, 1, 0, 0,
      0, 1, 0, 0,       // 1
      0, 1, 0, 0,
      1, 1, 1, 0
    ],
    [ 0, 1, 1, 0,
      1, 0, 0, 1,
      0, 0, 1, 0,       // 2
      0, 1, 0, 0,
      1, 1, 1, 1
    ],
    [ 1, 1, 1, 0,
      0, 0, 0, 1,
      0, 0, 1, 0,       // 3
      0, 0, 0, 1,
      1, 1, 1, 0
    ],
    [ 1, 0, 1, 0,
      1, 0, 1, 0,
      1, 1, 1, 1,       // 4
      0, 0, 1, 0,
      0, 0, 1, 0
    ],
    [ 1, 1, 1, 1,
      1, 0, 0, 0,
      1, 1, 1, 0,       // 5
      0, 0, 0, 1,
      1, 1, 1, 0
    ],
    [ 0, 1, 1, 1,
      1, 0, 0, 0,
      1, 1, 1, 0,       // 6
      1, 0, 0, 1,
      0, 1, 1, 0
    ],
    [ 1, 1, 1, 1,
      0, 0, 0, 1,
      0, 0, 1, 0,       // 7
      0, 1, 0, 0,
      0, 1, 0, 0
    ],
    [ 0, 1, 1, 0,
      1, 0, 0, 1,
      0, 1, 1, 0,       // 8
      1, 0, 0, 1,
      0, 1, 1, 0
    ],
    [ 0, 1, 1, 0,
      1, 0, 0, 1,
      0, 1, 1, 1,       // 9
      0, 0, 0, 1,
      1, 1, 1, 1
    ],
  ],
  names   : ["Goulart", "Goncalo", "Francisco", "Jose", "Maria"],
  outputs : [ 6, 6, 8, 6, 7],
}

//XOR PROBLEM
let datasetXor = {
  inputs:
    [[1, 1],
      [1, 0],
      [0, 1],
      [0, 0]],
  outputs:
    [[0],
      [1],
      [1],
      [0]]
}
let rna = new RNA(2, 3, 1);
var train = true;

// testando se rede ta funcionando
function training() {
  console.log("Iniciando treino...");
  if(train) {
     for(let i = 0; i < 100; i++) {
      let index = Math.floor(Math.random());
      rna.train(datasetXor.inputs[index], datasetXor.outputs[index])
    }

    if(rna.predict([0, 0])[0] < 0.04 ||  rna.predict([1, 0])[0] > 0.98){
      train = false;
      console.log("Treino finalizado...\n");
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
testing();
