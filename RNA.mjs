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

// DERIVADA DA SIGMOID
function dSigmoid(x) {
    return x * (1 - x);
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

        // Taxa de aprendizado
        this.learning_rate = 0.1;
    }

    train(arr, target) {

        // -----------------------------------------------------------
        // ----------------------> FEEDFOWARD <-----------------------
        // -----------------------------------------------------------

        //CAMADA DE ENTRADA -> CAMADA OCULTA
        let input = Matriz.array2matriz(arr);
        let hide = Matriz.multi(this.weightsIn2Hide, input);
        hide = Matriz.add(hide, this.bias_In2Hide);

        hide.map(sigmoid);

        //CAMADA OCULTA -> CAMADA DE SAÍDA
        let out = Matriz.multi(this.weightsHide2Out, hide);
        out = Matriz.add(out, this.bias_Hide2Out);
        out.map(sigmoid)

        // -----------------------------------------------------------
        // --------------------> BACKPROPAGATION <--------------------
        // -----------------------------------------------------------
        let expected = Matriz.array2matriz(target);
        let outputError = Matriz.sub(expected, out);
        let dOutput = Matriz.map(out, dSigmoid)
        let hiddenT = Matriz.transposer(hide);

        let gradient = Matriz.hadamaard(outputError, dOutput);
        gradient = Matriz.multi_escalar(gradient, this.learning_rate);

        // ajuste de bias
        this.bias_Hide2Out = Matriz.add(this.bias_Hide2Out, gradient);

        // OUTPUT -> HIDDEN
        let weightsHide2OutDelta = Matriz.multi(gradient, hiddenT);
        this.weightsHide2Out = Matriz.add(this.weightsHide2Out, weightsHide2OutDelta);

        let weightsHide2Out_T = Matriz.transposer(this.weightsHide2Out);
        let hiddenError = Matriz.multi(weightsHide2Out_T, outputError);
        let dHidden = Matriz.map(hide, dSigmoid);
        let inputT = Matriz.transposer(input);

        let gradientH = Matriz.hadamaard(hiddenError, dHidden);
        gradientH = Matriz.multi_escalar(gradient, this.learning_rate);

        // Ajuste de bias
        this.bias_In2Hide = Matriz.add(this.bias_In2Hide, gradientH);

        let weightsIn2HideDelta = Matriz.multi(gradientH, inputT);
        this.weightsIn2Hide = Matriz.add(this.weightsIn2Hide, weightsIn2HideDelta);
        // ----------------------------------------------------------
    }

    predict(arr) {
        // -----------------------------------------------------------
        // ----------------------> FEEDFOWARD <-----------------------
        // -----------------------------------------------------------
        //CAMADA DE ENTRADA -> CAMADA OCULTA
        let input = Matriz.array2matriz(arr);
        let hide = Matriz.multi(this.weightsIn2Hide, input);
        hide = Matriz.add(hide, this.bias_In2Hide);

        hide.map(sigmoid);

        //CAMADA OCULTA -> CAMADA DE SAÍDA
        let out = Matriz.multi(this.weightsHide2Out, hide);
        out = Matriz.add(out, this.bias_Hide2Out);
        out.map(sigmoid)
        out = Matriz.matriz2array(out);

        return out;
    }
}

