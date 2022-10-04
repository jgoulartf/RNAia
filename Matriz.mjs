/*Arquivo da biblioteca matriz criado para rede neural*/

//classe matriz
export class Matriz{
    
    constructor(linhas, colunas){
        this.linhas = linhas;
        this.colunas = colunas;

        this.data = [];
        
        // CRIANDO A MATRIZ
        for(let i =0; i< linhas; i++){                      
            let ary = []
            for(let j = 0; j < colunas; j++){
                ary.push(0)  
            }
            this.data.push(ary);
        }
        //adiciona o array criado na matriz no array da classe

    }
    
    //FUNÇÃO PARA EXIBIR MATRIZ NO CONSOLE
    print(){
        console.table(this.data);
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
    
        matriz.map((num, i, j) =>{       
            return A.data[i][j] + B.data[i][j];  
        });
        
        return matriz;
    }


    //FUNÇÃO MULTI PARA MULTIPLICAR MATRIZES
    static multi(A, B){
        var matriz = new Matriz(A.linhas, B.colunas);
                
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

    //FUNÇÃO PARA RANDOMIZAR VALORES
    randomize(){
        this.map((elm, i, j) =>{
            return Math.random() * 2 - 1;  //chamo um número randomico e adiciono uma variável.     
        })
    }
}
