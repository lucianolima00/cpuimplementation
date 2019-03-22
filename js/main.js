//Memoria
var mem = [];
//RI - Registradores internos
var E = 0;
var L = 0;
var G = 0;
//R - Registradores, recebem valores antes de inicar o programa
var r0 = document.getElementById('r0');
var r1 = document.getElementById('r1');
var r2 = document.getElementById('r2');
var r3 = document.getElementById('r3');
//MBR - Recebe a instrucao a ser gravada ou lida
var mbr = document.getElementById('mbr');
//IMM - Recebe o valor em binario de um numero
var imm = document.getElementById('imm');
//IR - Recebe o valor em binario do opcode
var ir = document.getElementById('ir');
//RO - Recebe o registrador a ser usado na instrucao
var ro0 = document.getElementById('ro0');
var ro1 = document.getElementById('ro1');
var ro2 = document.getElementById('ro2');
//PC - Contador de linhas
var pc = document.getElementById('pc');
//MAR - Recebe o endereço do memoria
var mar = document.getElementById('mar');


//Funcao q inicializa a memoria com 0 em todos os enderecos
function memInit(mem){
    for(var i = 0; i < 100; i++){
        mem[i] = "0000 0000 0000 0000 0000 0000 0000 0000";
    }
}

//Funcao q mostra a memoria na pag
function memory(){
    var Memory = document.getElementById("memory");
    var el = '';
    for(var i = 0; i < 100; i++){
        if(mem[i] == undefined){
            memInit(mem);
        }
        if(i == 0){
            el += '<div class="row"><div class="input-group col"><div class="input-group-prepend"><span class="input-group-text">'+ i.toString(16).toUpperCase() + '</span></div><input class="form-control value" type="text" id="'+ i + '" placeholder="' + mem[i] + '" onblur="changeMem()"></div>'
        }
        else if(i % 2 == 0){
            el += '</div>\n<div class="row"><div class="input-group col"><div class="input-group-prepend"><span class="input-group-text">'+ i.toString(16).toUpperCase() + '</span></div><input class="form-control value" type="text" id="'+ i + '" placeholder="' + mem[i] + '" onblur="changeMem()"></div>'
        }else{ 
            el +='<div class="input-group col"><div class="input-group-prepend"><span class="input-group-text">'+ i.toString(16).toUpperCase() + '</span></div><input class="form-control value" type="text" id="'+ i + '" placeholder="' + mem[i] + '" onblur="changeMem()"></div>';
        }
        Memory.innerHTML = el;
    }
}

function changeMem(){
    var el = event.target;
    var num = parseInt(el.value, 10); 
    var txt = "";
    if (num.toString(2).length < 32){
        for(var i = 0; i < 32 - num.toString(2).length; i++){
            txt += "0";
            if(i % 4 == 0 && i != 0){
                txt += " ";
            }
        }
        txt += num.toString(2);
    }
    mem[el.id] = txt;
    el.value = "";
    memory()
}

var bin2op = new Map([
    ["00000", "hlt"],
    ["00001", "ld"],
    ["00010", "st"],
    ["00011", 'add'],
    ["00100", "sub"],
    ["00101", "mul"],
    ["00110", "div"],
    ["00111", "lsh"],
    ["01000", "rsh"],
    ["01001", "cmp"],
    ["01010", "je"],
    ["01011", "jne"],
    ["01100", "jl"],
    ["01101", "jle"],
    ["01110", "jg"],
    ["01111", "jge"],
    ["10000", "jmp"],
    ["10001", "movih"],
    ["10010", "movil"],
    ["10011", "addi"],
    ["10100", "subi"],
    ["10101", "muli"],
    ["10110", "divi"],
    ["10111", "movrr"]
]);
var op2bin = new Map([
    ["hlt", "00000"],
    ["ld", "00001"],
    ["st", "00010"],
    ['add', "00011"],
    ["sub", "00100"],
    ["mul", "00101"],
    ["div", "00110"],
    ["lsh", "00111"],
    ["rsh", "01000"],
    ["cmp", "01001"],
    ["je", "01010"],
    ["jne", "01011"],
    ["jl", "01100"],
    ["jle", "01101"],
    ["jg", "01110"],
    ["jge", "01111"],
    ["jmp", "10000"],
    ["movih", "10001"],
    ["movil", "10010"],
    ["addi", "10011"],
    ["subi", "10100"],
    ["muli", "10101"],
    ["divi", "10110"],
    ["movrr", "10111"]
]);
var bin2reg = new Map ([
    ["00", "r0"],
    ["01", "r1"],
    ["10", "r2"],
    ["11", "r3"],
]);

var reg2bin = new Map ([
    ["r0", "00"],
    ["r1", "01"],
    ["r2", "10"],
    ["r3", "11"]
]);

function load(M, mem){
    return mem[M];
}
function store(regX, M,mem){
    mem[M] = regX;
}
function add(regY, regZ){
    return regY + regZ;
}
function sub(regY, regZ){
    return regY - regZ;
}
function mul(regY, regZ){
    return regY * regZ;
}
function div(regY, regZ){
    return regY / regZ;
}
/*
function leftShift(regX, imm){

}
function rightShift(regX, imm){

}
 */

function compare(regX, regY, E, L, G){
    if(regX == regY){
        E = 1;
    }else if(regX > regY){
        L = 1;
    }else{
        G = 1;
    }

}

/*
var desc = [
    'Faz o processador terminar o ciclo de instrucao. Deve-se colocar no fim do programa.',
    'Carrega para o registrador X uma palavra da memoria no endereco Y.',
    'Armazena no endereco de memoria Y o conteudo do registrador X.',
    'regX = regY + regZ',
    'regX = regY - regZ',
    'regX = regY * regZ',
    'regX = regY / regZ',
    'Desloca a palavra no registrador X em imm bits a esquerda.',
    'Desloca a palavra no registrador X em imm bits a direita.',
    'Compara a palavra no registrador X com a palavra no registrador Y e preenche os registradores internos E, L e G os valores fazendo sequencialmente os seguintes testes: 1. Se reg0 = reg1, entao E = 1; senao E = 0; 2. Se reg0 < reg1, entao L = 1; senao L = 0; 3. Se reg0 > reg1, entao G = 1; senao G = 0.',
    'Muda o registrador PC para o endereco de memoria X caso E = 1',
    'Muda o registrador PC para o endereco de memoria X caso E = 0.',
    'Muda o registrador PC para o endereco de memoria X caso L = 1.',
    'Muda o registrador PC para o endereco de memoria X caso E = 1 ou L = 1.',
    'Muda o registrador PC para o endereco de memoria X caso G = 1.',
    'Muda o registrador PC para o endereco de memoria X caso E = 1 ou G = 1.',
    'Muda o registrador PC para o endereco de memoria X.',
    'Move os 16 bits menos significativos (0:15) do imediato para a parte superior (16:31) do registrador X.',
    'Move os 16 bits menos significativos (0:15) do imediato para a parte inferior (0:15) do registrador X. Alem disso a parte superior (16:31) do registrador X e zerada.',
    'regX = regX + imm',
    'regX = regX - imm',
    'regX = regX * imm',
    'regX = regX / imm',
    'regX = regY'
];

function documentation(bin2op){
    var doc = document.getElementById("doc");
    var el = '';
    for(var i = 0; i < 24; i++){
        el += '<div class="row"><div class="input-group col"><div class="input-group-prepend"><span class="input-group-text" >'+ bin2op.get(i.toString(2)) + '</span></div><input class="form-control value" type="text" placeholder="DESC:'+ desc[i] +'" readonly></div></div>'
        doc.innerHTML = el;
    }
}
*/

var opreg1 = ["ld", "st", "lsh", "rsh", "je", "jne", "jl", "jle", "jg", "jge", "jmp", "movih", "movil", "addi", "subi", "muli", "divi"];
var opreg2 = ["cmp", "movrr"];
var opreg3 = ["add", "sub", "mul", "div"];

function addImm(txt){
    var num = parseInt(txt, 10);
    txt = num.toString(2);
    if(txt.length < 25){
        var txt2 = "";
        for(var i = 0; i < 25 - txt.length; i++){
            txt2 += "0";
        }
        txt = txt2 + txt;
    }
    return txt;
}

function compile(){
	var code = document.getElementById("code");
    var btncompile = document.getElementById("btncompile");
    //Pegar codigo em ASCII e converter em binario e salvar na memoria
    btncompile.onclick = function(){
        //Cria um array com cada linha do codigo
        var str = code.value.split("\n");
        var wrd = [];
        //Separa espaço e tira as virgulas de cada palavra
        for(var i = 0; i < str.length; i++){
            var div = str[i].split(",").join("");
            for(var j = 0; j < div.split(" ").length; j++){
                wrd.push(div.split(" ")[j]);
            }
        }
        var word = "";
        //Verifica se a palavra eh um Opcode, Registrador ou Inteiro
        for(var i = 0; i < wrd.length; i++){
            if(op2bin.has(wrd[i])){ 
                word = op2bin.get(wrd[i]);
            }else if(reg2bin.has(wrd[i])){
                word += reg2bin.get(wrd[i]);
            }else{
                word += addImm(wrd[i]);
            }

            if(wrd[i+1] == undefined || op2bin.has(wrd[i+1])){
                if(word != ""){
                    while(word.length < 32){
                        word += "0";
                    }
                    var word1 = word;
                    word = ""
                    for(var k = 1; k <= word1.length; k++){
                        if(k!= 1 && k % 4 == 0){
                            word += word1[k-1];
                            word += " ";
                        }else{
                            word += word1[k-1];
                        }
                    }
                    for(var j = 0; j < 100; j++){
                        if(mem[j] == "0000 0000 0000 0000 0000 0000 0000 0000"){
                            mem[j] = word;
                            break;
                        }
                    }
                }
                word = "";
            }
            memory()
        }
        
    };    
};
compile();

function run(){
    for(var i = 0; i < mem.length; i++){

    }
}