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

//FUNÇÃO DERIVADA DE SIGMOID
function DXsigmoid(x){
    return x * (1-x);
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


        this.learningRate = 0.1;                             //learning rate de 10%
    }

    //FUNÇÃO PARA REALIZAR O PROCESSO DE TREINO
    train(ary, target){
        
        ////////////////////////////////////////////////////////////////////
        /*--------------------------FEEDFOWARD----------------------------*/
        ///////////////////////////////////////////////////////////////////
        
        //CAMADA DE ENTRADA -> CAMADA OCULTA
        let input = Matriz.array2matriz(ary);
        let hide = Matriz.multi(this.weightsIn2Hide, input);

        hide = Matriz.add(hide, this.bias_In2Hide);
        hide.map(sigmoid);                  

        //CAMADA OCULTA -> CAMADA DE SAÍDA
        
        let out = Matriz.multi(this.weightsHide2Out, hide);
        out = Matriz.add(out, this.bias_Hide2Out);
        out.map(sigmoid);

        ////////////////////////////////////////////////////////////////////
        /*-----------------------BACKPROPAGATION-------------------------/*/
        ///////////////////////////////////////////////////////////////////

        //CAMADA DE SAÍDA -> CAMADA OCULTA
        let expected = Matriz.array2matriz(target);
        let outError = Matriz.sub(expected, out);
        let DXoutput = Matriz.map(out, DXsigmoid);
        let hideT = Matriz.transposer(hide);

        let gradient = Matriz.hadamaard(outError, DXoutput);

        gradient = Matriz.multi_escalar(gradient, this.learningRate);
        
        //AJUSTANDO BIAS
        this.bias_Hide2Out = Matriz.add(this.bias_Hide2Out, gradient);
        //AJUSTANDO PESOS
        let weightsHide2Out_Delta = Matriz.multi(gradient, hideT); 
        this.weightsHide2Out = Matriz.add(this.weightsHide2Out, weightsHide2Out_Delta);
        
        
        //CAMADA OCULTA -> ENTRADA
        let weightsHide2Out_T = Matriz.transposer(this.weightsHide2Out);
        let hideError = Matriz.multi(weightsHide2Out_T, outError);
        let DXhide = Matriz.map(hide, DXsigmoid);
        let inputT = Matriz.transposer(input);

        let gradientHide = Matriz.hadamaard(hideError, DXhide);
        gradientHide = Matriz.multi_escalar(gradientHide, this.learningRate); 

        //AJUSTANDO BIAS
        this.bias_In2Hide = Matriz.add(this.bias_In2Hide, gradientHide);

        //AJUSTANDO PESO
        let weightsIn2Hide_Delta = Matriz.multi(gradientHide, inputT);
        this.weightsIn2Hide = Matriz.add(this.weightsIn2Hide, weightsIn2Hide_Delta)
    }


    predict(ary){
         //CAMADA DE ENTRADA -> CAMADA OCULTA
         let input = Matriz.array2matriz(ary);
         let hide = Matriz.multi(this.weightsIn2Hide, input);
 
         hide = Matriz.add(hide, this.bias_In2Hide);
         hide.map(sigmoid);                  
 
         //CAMADA OCULTA -> CAMADA DE SAÍDA
         
         let out = Matriz.multi(this.weightsHide2Out, hide);
         out = Matriz.add(out, this.bias_Hide2Out);
         out.map(sigmoid);

         out = Matriz.matriz2array(out);
         return out;
    }



}

