import{RNA} from './RNA.mjs';
import { Matriz } from './Matriz.mjs';
var rna = new RNA(2,3,1);
var dataset;

//XOR PROBLEM
dataset = {
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

var train = true;
if (train) {
    for (var i = 0; i < 10000; i++) {
        var index = Math.floor(Math.random(4));
        rna.train(dataset.inputs[index], dataset.outputs[index]);
    }
    if (rna.predict([0, 0])[0] < 0.04 && rna.predict([1, 0])[0] > 0.98) {
        console.log("entrou no segundo if")
        train = false;
    }

}
/*let B = new Matriz(2,1);

A.randomize();
console.log("MATRIZ A");
A.print();

B.randomize();
console.log("MATRIZ B");
B.print();

let C = Matriz.hadamaard(A,B);
console.log("HADAMAARD A X B");
C.print();

C = Matriz.multi_escalar(A,10);
console.log("MULTI ESCALAR A X 10");
C.print();

C = Matriz.transposer(A);
console.log("TRANSPOSTA A");
C.print();

C = Matriz.sub(A,B);
console.log("SUBTRAÇÃO A - B");
C.print();*/
