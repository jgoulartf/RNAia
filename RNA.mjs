/*///////////////////////
////////////////////////
arquivo da Rede neural
////////////////////////
/////////////////////*/
import { Matriz } from "./Matriz.mjs";


//FUNÇÃO SIGMOID
function sigmoid(x){
    return 1/(1+Math.exp(-x));
}

//CLASSE REDE NEURAL
export class RNA{
    constructor(in_nodes, hide_nodes, out_nodes){                           //construtor que recebe a quantidade de nós de cada camada.
        
        //CAMADAS
        this.in_nodes = in_nodes;                                           // camada de entrada
        this.hide_nodes = hide_nodes;                                       // camada oculta    
        this.out_nodes = out_nodes;                                         // camada de saida    
        
        //BIAS
        this.bias_In2Hide = new Matriz (this.hide_nodes, 1);
        this.bias_In2Hide.randomize();
        this.bias_Hide2Out = new Matriz (this.out_nodes, 1);
        this.bias_Hide2Out.randomize();
        
        //PESOS
        this.weightsIn2Hide = new Matriz(this.hide_nodes, this.in_nodes);
        this.weightsIn2Hide.randomize();
        this.weightsHide2Out = new Matriz(this.out_nodes, this.hide_nodes);
        this.weightsHide2Out.randomize();
    }

    //FUNÇÃO PARA REALIZAR O PROCESSO DE FEEDFOWARD
    feedfoward(ary){
        //CAMADA DE ENTRADA -> CAMADA OCULTA
        let input = Matriz.array2matriz(ary);
        let hide = Matriz.multi(this.weightsIn2Hide, input);

        hide = Matriz.add(hide, this.bias_In2Hide);
        
        hide.print();
        hide.map(sigmoid);
        hide.print();

        //CAMADA OCULTA -> CAMADA DE SAÍDA
        
        let out = Matriz.multi(this.weightsHide2Out, hide);
        out = Matriz.add(out, this.bias_Hide2Out);

        //out.print();
    }
}

