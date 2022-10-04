/*Arquivo da biblioteca matriz criado para rede neural*/

//classe matriz
class Matriz{
    constructor(linhas, colunas){
        this.linhas = linhas;
        this.colunas = colunas;

        this.data = [];
        
        // CRIANDO A MATRIZ
        for(let i =0; i< linhas; i++){                      
            let ary = []
            for(let j = 0; j < colunas; j++){
                ary.push(Math.floor(Math.random()*10))        //FUNÇÃO PARA GERAR NUMEROS RANDOMICOS E ARREDONDADOS
            }
            this.data.push(ary);
        }
        //adiciona o array criado na matriz no array da classe

    }
    
    //FUNÇÃO MAP PARA TRATAR A CLASSE MATRIZ
    map(func) {
        return this.data = this.data.map((ary, i) => {
            return ary.map((num, j) => {
                return func ( num, i, j);
            })
        })
    }
    
    // FUNÇÃO ADD PARA SOMAR DUAS MATRIZES
    static add (A, B){
        var matriz = new Matriz(A.linhas, A.colunas);
        
        console.log("matriz antes da add : ",matriz); // teste para ver a matriz antes da multiplicação
        
        matriz.map((elm) =>{
            return elm * 2;    // valor de teste para ver se está funcionando, o 2 será retirado, está apenas como teste 
        });

        return matriz;
    }

    static multi(A, B){
        var matriz = new Matriz(A.linhas, B.colunas);
        
        console.log("matriz antes da multi : ",matriz); // teste para ver a matriz antes da multiplicação
        
        matriz.map((num, i, j) => {
            let soma = 0;
            for(let k = 0; k < A.colunas; k++){
                let aux_1 = A.data [i] [k];
                let aux_2 = B.data [k] [j];
                soma += aux_1 * aux_2;
            }
            return soma;

        })
        return matriz;

        
    }
       
}




//teste

var m = new Matriz(3, 3);
var m1 = new Matriz(3, 3);

var m2 = new Matriz(2, 1);
var m3 = new Matriz(1, 2);


// teste função add
console.log("matriz depois da add : ", Matriz.add(m, m1)); // teste para ver se a função ta funcionando
 
// teste função multi
console.log("matriz depois da multi : ", Matriz.multi(m2, m3)); // teste para ver se a função ta funcionando
