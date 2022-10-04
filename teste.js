import{RNA} from './RNA.mjs';
import { Matriz } from './Matriz.mjs';


let A = new Matriz(2,1);
let B = new Matriz(2,1);

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
C.print();
