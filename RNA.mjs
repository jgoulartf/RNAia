/*///////////////////////
////////////////////////
arquivo da Rede neural
////////////////////////
/////////////////////*/
import { Matriz } from "./Matriz.mjs";



export class RNA{
    constructor(in_nodes, hide_nodes, out_nodes){                           //construtor que recebe a quantidade de nós de cada camada.
        
        //CAMADAS
        this.in_nodes = in_nodes;                                           // camada de entrada
        this.hide_nodes = hide_nodes;                                       // camada oculta    
        this.out_nodes = out_nodes;                                         // camada de saida    
        //BIAS
        this.bias_In2Hiden = new Matriz (this.hide_nodes, 1);
        this.bias_In2Hiden.randomize();
        this.bias_Hiden2Out = new Matriz (this.out_nodes, 1);
        this.bias_Hiden2Out.randomize();
        
        
        
        //TESTE
        this.bias_In2Hiden.print();
        this.bias_Hiden2Out.print();


    }
}

