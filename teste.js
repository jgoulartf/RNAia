import{ RNA } from './RNA.mjs';
import { Matriz } from './Matriz.mjs';


function setup() {
  let rna = new RNA(2, 3, 2);
  let arr = [1, 2];
  rna.train(arr, [0, 1]);

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

}
setup();