import{RNA} from './RNA.mjs';
import { Matriz } from './Matriz.mjs';


let A = new Matriz(2,1);
let B = new Matriz(2,1);
A.randomize();
A.print();
B.randomize();
B.print();

let C = Matriz.hadamaard(A,B);
C.print();