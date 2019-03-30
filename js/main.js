//CPU Implementation

//Memoria
var mem = [];
//RI - Registradores internos
var E;
var L;
var G;
//R - Recebe valores
var R0;
var R1;
var R2;
var R3;
//MBR - Recebe a instrucao a ser gravada ou lida
var MBR;
//IMM - Recebe o valor em binario de um numero
var IMM;
//IR - Recebe o valor em binario do opcode
var IR;
//RO - Recebe o registrador a ser usado na instrucao
var RO0;
var RO1;
var RO2;
//PC - A ponta a posicao da memoria a ser lida
var PC;
//MAR - Recebe o endereço do memoria
var MAR;

//Identificadores do ciclo da maquina
var srch = false;
var deco = false;

//Funcao q inicializa os registradores com 0
function regInit(){
    E = 0;
    L = 0;
    G = 0;
    R0 = "0";
    R1 = "0";
    R2 = "0";
    R3 = "0";
    MBR = "0";
    IMM = "0";
    IR = "0";
    RO0 = "0";
    RO1 = "0";
    RO2 = "0";
    PC = "0";
    MAR = "0";
    registrator();
}
//Funcao q mostra (atualiza) os registradores na pag
function registrator(){
    var r0 = document.getElementById('r0').placeholder = addZeroHex(R0);
    var r1 = document.getElementById('r1').placeholder = addZeroHex(R1);
    var r2 = document.getElementById('r2').placeholder = addZeroHex(R2);
    var r3 = document.getElementById('r3').placeholder = addZeroHex(R3);
    var mbr = document.getElementById('mbr').placeholder = addZeroHex(MBR);
    var imm = document.getElementById('imm').placeholder = addZeroHex(IMM);
    var ir = document.getElementById('ir').placeholder = addZeroHex(IR);
    var ro0 = document.getElementById('ro0').placeholder = addZeroHex(RO0);
    var ro1 = document.getElementById('ro1').placeholder = addZeroHex(RO1);
    var ro2 = document.getElementById('ro2').placeholder = addZeroHex(RO2);
    var pc = document.getElementById('pc').placeholder = PC;
    var mar = document.getElementById('mar').placeholder = addZeroHex(MAR);
}


//Funcao q inicializa a memoria com 0 em todos os enderecos
function memInit(){
    for(var i = 0; i < 100; i++){
        mem[i] = "0";
    }
    regInit();
    memory();
}

//Funcao q mostra (atualiza) a memoria na pag
function memory(){
    var m;
    var memory;
    for(var i = 0; i < 100; i++){
        if(mem[i] == undefined){
            memInit();
            regInit();
        }
        m = document.getElementById(i);
        memory = parseInt(mem[i], 2);
        m.placeholder = addZeroHex(memory.toString(16));
    }
    registrator();
}

//Funcao que recebe numero inteiro digitado diretamente na memoria
function changeMem(){
    var el = event.target;
    var num = parseInt(el.value, 10);
    mem[el.id] = addZeroBin(num.toString(2));
    el.value = "";
    memory()
}

//Mapa de codigos binarios que retorna o opcode
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

//Mapa de opcodes que retorna codigos binarios
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

//Mapa de opcodes em hexadecimal que retorna codigos binarios
var hex2bin = new Map([
    ["0", "00000"],
    ["1", "00001"],
    ["2", "00010"],
    ['3', "00011"],
    ["4", "00100"],
    ["5", "00101"],
    ["6", "00110"],
    ["7", "00111"],
    ["8", "01000"],
    ["9", "01001"],
    ["A", "01010"],
    ["B", "01011"],
    ["C", "01100"],
    ["D", "01101"],
    ["E", "01110"],
    ["F", "01111"],
    ["10", "10000"],
    ["11", "10001"],
    ["12", "10010"],
    ["13", "10011"],
    ["14", "10100"],
    ["15", "10101"],
    ["16", "10110"],
    ["17", "10111"]
]);

//Mapa de codigos binarios que retorna os registradores
var bin2reg = new Map ([
    ["00", "r0"],
    ["01", "r1"],
    ["10", "r2"],
    ["11", "r3"],
]);

//Mapa de registradores que retorna codigo binario
var reg2bin = new Map ([
    ["r0", "00"],
    ["r1", "01"],
    ["r2", "10"],
    ["r3", "11"]
]);

//Adiciona 0s a esquerda ate palavra ter 32 bits
function addZeroBin(txt){
    if(txt.length < 32){
        var txt2 = "";
        for(var i = 0; i < 32 - txt.length; i++){
            txt2 += "0";
        }
        txt = txt2 + txt;
    }
    return txt;
}

//Adiciona 0s a esquerda ate palavra ter 6 bits
function addZeroHex(txt){
    if(txt.length < 6){
        var txt2 = "";
        for(var i = 0; i < 6 - txt.length; i++){
            txt2 += "0";
        }
        txt = txt2 + txt;
    }
    return "0x" + txt.toUpperCase();
}

//Converte IMM para binario e adiciona 0 a esquerda caso seja menor q 32bits
function addZeroImm(txt){
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

//Funcao que retorna o registrador de acordo cm o codigo binario
function returnReg(regX){
    if(regX == '0'){
        return R0;
    }else if(regZ == '1'){
        return R1;
    }else if(regZ == '10'){
        return R2;
    }else if(regZ == '11'){
        return R3;
    }else{
        console.log('Registrator not found');
    }
}

//Funcao que finaliza o programa
function halt(){
    btncompile = document.getElementById("run");
    btncompile.value = "Disabled";
    btncompile.disabled = true;
}

//Funcao que atribui a um registrador, um valor por um endereço de memoria
function load(regX, M){
    if(regX == '0'){
        R0 = parseInt(mem[M], 2).toString(16);
    }else if(regX == '1'){
        R1 = parseInt(mem[M], 2).toString(16);
    }else if(regX == '10'){
        R2 = parseInt(mem[M], 2).toString(16);
    }else if(regX == "11"){
        R3 = parseInt(mem[M], 2).toString(16);
    }else{
        console.log('Registrator not found');
    }
    
}

//Funcao que salva o conteudo de um registrador para uma memoria
function store(regX, M){
    if(regX == '0'){
        MBR = R0;
    }else if(regX == '1'){
        MBR = R1;
    }else if(regX == '10'){
        MBR = R2;
    }else if(regX == "11"){
        MBR = R3;
    }else{
        console.log('Registrator not found');
    }
    mem[M] = addZeroBin(MBR.toString(2));
    memory();
}

//Funcao que soma dois registradores e salva o resultado em outro
function add(regX, regY, regZ){
    regY = returnReg(regY);
    regZ = returnReg(regZ);

    if(regX == '0'){
        R0 = (parseInt(regY, 16) + parseInt(regZ, 16)).toString(16);
    }else if(regX == '1'){
        R1 = (parseInt(regY, 16) + parseInt(regZ, 16)).toString(16);
    }else if(regX == '10'){
        R2 = (parseInt(regY, 16) + parseInt(regZ, 16)).toString(16);
    }else if(regX == "11"){
        R3 = (parseInt(regY, 16) + parseInt(regZ, 16)).toString(16);
    }else{
        console.log('Registrator not found');
    }
}

//Funcao que subtrai dois registradores e salva o resultado em outro
function sub(regX, regY, regZ){
    regY = returnReg(regY);
    regZ = returnReg(regZ);

    if(regX == '0'){
        R1 = (parseInt(regY, 16) - parseInt(regZ, 16)).toString(16);
    }else if(regX == '1'){
        R1 = (parseInt(regY, 16) - parseInt(regZ, 16)).toString(16);
    }else if(regX == '10'){
        R2 = (parseInt(regY, 16) - parseInt(regZ, 16)).toString(16);
    }else if(regX == "11"){
        R3 = (parseInt(regY, 16) - parseInt(regZ, 16)).toString(16);
    }else{
        console.log('Registrator not found');
    }
}

//Funcao que multiplica dois registradores e salva o resultado em outro
function mul(regX, regY, regZ){
    regY = returnReg(regY);
    regZ = returnReg(regZ);
    if(regX == '0'){
        R1 = (parseInt(regY, 16) * parseInt(regZ, 16)).toString(16);
    }else if(regX == '1'){
        R1 = (parseInt(regY, 16) * parseInt(regZ, 16)).toString(16);
    }else if(regX == '10'){
        R2 = (parseInt(regY, 16) * parseInt(regZ, 16)).toString(16);
    }else if(regX == "11"){
        R3 = (parseInt(regY, 16) * parseInt(regZ, 16)).toString(16);
    }else{
        console.log('Registrator not found');
    }
}

//Funcao que divide dois registradores e salva o resultado em outro
function div(regX, regY, regZ){
    regY = returnReg(regY);
    regZ = returnReg(regZ);
    if(regX == '0'){
        R1 = (parseInt(regY, 16) / parseInt(regZ, 16)).toString(16);
    }else if(regX == '1'){
        R1 = (parseInt(regY, 16) / parseInt(regZ, 16)).toString(16);
    }else if(regX == '10'){
        R2 = (parseInt(regY, 16) / parseInt(regZ, 16)).toString(16);
    }else if(regX == "11"){
        R3 = (parseInt(regY, 16) / parseInt(regZ, 16)).toString(16);
    }else{
        console.log('Registrator not found');
    }
}

//Funcao que deleta uma quantidade de casas a esquerda e adiciona 0s a direita
function leftShift(regX, imm){
    var zero = "";
    for(var i = 0; i< imm; i++){
        zero += "0";
    }
    if(regX == '0'){
        var r = addZeroBin(parseInt(R0, 16).toString(2));
        for(var i = 0; i < r.length; i++){
            if(i < imm){
                r.replace(charAt(i), "");
            }
        }
        r = r + zero;
        R0 = parseInt(r, 2).toString(16);
    }else if(regX == '1'){
        var r = addZeroBin(parseInt(R1, 16).toString(2));
        for(var i = 0; i < r.length; i++){
            if(i < imm){
                r.replace(charAt(i), "");
            }
        }
        r = r + zero;
        R1 = parseInt(r, 2).toString(16);
    }else if(regX == '10'){
        var r = addZeroBin(parseInt(R2, 16).toString(2));
        for(var i = 0; i < r.length; i++){
            if(i < imm){
                r.replace(charAt(i), "");
            }
        }
        r = r + zero;
        R2 = parseInt(r, 2).toString(16);
    }else if(regX == "11"){
        var r = addZeroBin(parseInt(R3, 16).toString(2));
        for(var i = 0; i < r.length; i++){
            if(i < imm){
                r.replace(charAt(i), "");
            }
        }
        r = r + zero;
        R3 = parseInt(r, 2).toString(16);
    }else{
        console.log('Registrator not found');
    }
}

//Funcao que deleta uma quantidade de casas a direita e adiciona 0s a esquerda
function rightShift(regX, imm){
    var zero = "";
    for(var i = 0; i< imm; i++){
        zero += "0";
    }
    imm = 32 - imm;
    if(regX == '0'){
        var r = addZeroBin(parseInt(R0, 16).toString(2));
        for(var i = r.length; i > imm; i--){
            if(i > imm){
                r.replace(charAt(i), "");
            }
        }
        r = zero + r;
        R0 = parseInt(r, 2).toString(16);
    }else if(regX == '1'){
        var r = addZeroBin(parseInt(R1, 16).toString(2));
        for(var i = r.length; i > imm; i--){
            if(i > imm){
                r.replace(charAt(i), "");
            }
        }
        r = zero + r;
        R1 = parseInt(r, 2).toString(16);
    }else if(regX == '10'){
        var r = addZeroBin(parseInt(R2, 16).toString(2));
        for(var i = r.length; i > imm; i--){
            if(i > imm){
                r.replace(charAt(i), "");
            }
        }
        r = zero + r;
        R2 = parseInt(r, 2).toString(16);
    }else if(regX == "11"){
        var r = addZeroBin(parseInt(R3, 16).toString(2));
        for(var i = r.length; i > imm; i--){
            if(i > imm){
                r.replace(charAt(i), "");
            }
        }
        r = zero + r;
        R3 = parseInt(r, 2).toString(16);
    }else{
        console.log('Registrator not found');
    }

}

//Funcao que compara dois registradores e salva o resultado em um registrador especifico pra cada resultado
function compare(regX, regY){
    regX = returnReg(regX);
    regY = returnReg(regY);

    if(parseInt(regX, 16) == parseInt(regY, 16)){
        E = 1;
        L = 0;
        G = 0;
    }else if(parseInt(regX, 16) > parseInt(regY, 16)){
        L = 1;
        E = 0;
        G = 0;
    }else{
        G = 1;
        L = 0;
        E = 0;
    }
}

//Funcao que move a execucao para uma posicao na memoria dependendo do resultado do compare
function jumpEqual(M){
    if(E){
        PC = M;
    }
}

//Funcao que move a execucao para uma posicao na memoria dependendo do resultado do compare
function jumpNotEqual(M){
    if(!E){
        PC = M;
    }
}

//Funcao que move a execucao para uma posicao na memoria dependendo do resultado do compare
function jumpLow(M){
    if(L){
        PC = M;
    }
}

//Funcao que move a execucao para uma posicao na memoria dependendo do resultado do compare
function jumpLowEqual(M){
    if(L || E){
        PC = M;
    }
}

//Funcao que move a execucao para uma posicao na memoria dependendo do resultado do compare
function jumpGreater(M){
    if(G){
        PC = M;
    }
}

//Funcao que move a execucao para uma posicao na memoria dependendo do resultado do compare
function jumpGreaterEqual(M){
    if(G || E){
        PC = M;
    }
}

//Funcao que move a execucao para uma posicao na memoria
function jump(M){
    PC = M;
}

//Funcao que adiciona a um registrador, pedaco de um numero
function movImmH(regX, Imm){
    for(var i = 0; i < Imm.length; i++){
        if(i > 16){
            var r;
            if(regX == "0"){
                r = addZeroBin(parseInt(R0, 16).toString(2));
                r.replace(r.charAt(i),Imm.charAt(i));
                R0 = parseInt(r, 2).toString(16);
            }else if(regX == "1"){
                r = addZeroBin(parseInt(R1, 16).toString(2));
                r.replace(r.charAt(i),Imm.charAt(i));
                R1 = parseInt(r, 2).toString(16);  
            }else if(regX == "10"){
                r = addZeroBin(parseInt(R2, 16).toString(2));
                r.replace(r.charAt(i),Imm.charAt(i));
                R2 = parseInt(r, 2).toString(16);
            }else if(regX == "11"){
                r = addZeroBin(parseInt(R3, 16).toString(2));
                r.replace(r.charAt(i),Imm.charAt(i));
                R3 = parseInt(r, 2).toString(16);
            }else{
                console.log("Registrador nao encontrado")
            }
        }
    }
}

//Funcao que adiciona a um registrador, pedaco de um numero
function movImmL(regX, Imm){
    for(var i = 0; i< Imm.length; i++){
        if(i <= 16){
            var r;
            if(regX == "0"){
                r = addZeroBin(parseInt(R0, 16).toString(2));
                r.replace(r.charAt(i),Imm.charAt(i));
                R0 = parseInt(r, 2).toString(16);
            }else if(regX == "1"){
                r = addZeroBin(parseInt(R1, 16).toString(2));
                r.replace(r.charAt(i),Imm.charAt(i));
                R1 = parseInt(r, 2).toString(16);  
            }else if(regX == "10"){
                r = addZeroBin(parseInt(R2, 16).toString(2));
                r.replace(r.charAt(i),Imm.charAt(i));
                R2 = parseInt(r, 2).toString(16);
            }else if(regX == "11"){
                r = addZeroBin(parseInt(R3, 16).toString(2));
                r.replace(r.charAt(i),Imm.charAt(i));
                R3 = parseInt(r, 2).toString(16);
            }else{
                console.log("Registrador nao encontrado")
            }
        }
    }
}

//Funcao que adiciona a um registrador um valor inteiro
function addImm(regX, Imm){
    if(regX == "0"){
        R0 = (parseInt(R0, 2) + parseInt(Imm, 2)).toString(16);
    }else if(regX == "1"){
        R1 = (parseInt(R1, 2) + parseInt(Imm, 2)).toString(16);
    }else if(regX == "10"){
        R2 = (parseInt(R2, 2) + parseInt(Imm, 2)).toString(16);
    }else if(regX == "11"){
        R3 = (parseInt(R3, 2) + parseInt(Imm, 2)).toString(16);
    }else{
        console.log("Registrador nao encontrado");
    }
}

//Funcao que subtrai a um registrador um valor inteiro
function subImm(regX, Imm){
    if(regX == "0"){
        R0 = (parseInt(R0, 2) - parseInt(Imm, 2)).toString(16);
    }else if(regX == "1"){
        R1 = (parseInt(R1, 2) - ImparseInt(Imm, 2)).toString(16);
    }else if(regX == "10"){
        R2 = (parseInt(R2, 2) - parseInt(Imm, 2)).toString(16);
    }else if(regX == "11"){
        R3 = (parseInt(R3, 2) - parseInt(Imm, 2)).toString(16);
    }else{
        console.log("Registrador nao encontrado")
    }
}

//Funcao que multiplica um registrador e um valor inteiro
function mulImm(regX, Imm){
    if(regX == "00"){
        R0 = (parseInt(R0, 2) * parseInt(Imm, 2)).toString(16);
    }else if(regX == "01"){
        R1 = (parseInt(R1, 2) * ImparseInt(Imm, 2)).toString(16);
    }else if(regX == "10"){
        R2 = (parseInt(R2, 2) * parseInt(Imm, 2)).toString(16);
    }else if(regX == "11"){
        R3 = (parseInt(R3, 2) * parseInt(Imm, 2)).toString(16);
    }else{
        console.log("Registrador nao encontrado")
    }
}

//Funcao que divide um registrador e um valor inteiro
function divImm(regX, Imm){
    if(regX == "00"){
        R0 = (parseInt(R0, 2) / parseInt(Imm, 2)).toString(16);
    }else if(regX == "01"){
        R1 = (parseInt(R1, 2) / ImparseInt(Imm, 2)).toString(16);
    }else if(regX == "10"){
        R2 = (parseInt(R2, 2) / parseInt(Imm, 2)).toString(16);
    }else if(regX == "11"){
        R3 = (parseInt(R3, 2) / parseInt(Imm, 2)).toString(16);
    }else{
        console.log("Registrador nao encontrado")
    }
}

//Funcao que atribui a um registrador o valor de outro registrador
function movRegReg(regX, regY){
    regX = returnReg(regX);
    regY = returnReg(regY);
    if(regX == "0"){
        R0 = regY;
    }else if(regX == "1"){
        R1 = regY;
    }else if(regX == "10"){
        R2 = regY;
    }else if(regX == "11"){
        R3 = regY;
    }else{
        console.log("Registrador nao encontrado")
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

//Conjunto de opcodes que usam um registrador
var opreg1 = ["ld", "st", "lsh", "rsh", "je", "jne", "jl", "jle", "jg", "jge", "jmp", "movih", "movil", "addi", "subi", "muli", "divi"];

//Conjunto de opcodes que usam IMM
var opregImm = ["movih", "movil", "addi", "subi", "muli", "divi"];

//Conjunto de opcodes que usam dois registrador
var opreg2 = ["cmp", "movrr"];

//Conjunto de opcodes que usam three registrador
var opreg3 = ["add", "sub", "mul", "div"];

//Funcao que adiciona as palavras na memoria
function compile(){
    PC = "0";
	var code = document.getElementById("code");
    var btncompile = document.getElementById("btncompile");
    //Pegar codigo em ASCII e converter em binario e salvar na memoria
    btncompile.onclick = function(){
        //Cria um array com cada linha do codigo
        var str = code.value.split("\n");
        var wrd = [];
        var word = "";
        //Separa espaço e tira as virgulas de cada palavra
        for(var i = 0; i < str.length; i++){
            var div = str[i].split(",").join("");
            for(var j = 0; j < div.split(" ").length; j++){
                wrd.push(div.split(" ")[j]);
            }
            word = "";
            //Verifica se a palavra eh um Opcode, Registrador ou Inteiro
            for(var t = 0; t < wrd.length; t++){
                //Busca palavras no mapa binario
                if(op2bin.has(wrd[t])){ 
                    word = op2bin.get(wrd[t]);
                }else if(reg2bin.has(wrd[t])){
                    word += reg2bin.get(wrd[t]);
                }else{
                    word += addZeroImm(wrd[t]);
                }
                //Verifica se eh a ultima palavra da linha ou do codigo todo
                if(wrd[t+1] == undefined || op2bin.has(wrd[t+1])){
                    if(word != ""){
                        while(word.length < 32){
                            word += "0";
                        }
                        //Salva a palavra na memoria
                        mem[i] = addZeroBin(word);
                    }
                    word = "";
                }
                memory()
            }
        }
        
    };    
};
compile();

//Funcao que faz o ciclo da maquina
function run(){
    var word = "";
    var p = PC;
    //Verifica se foi feito busca na memoria
    if(srch == false){
        //Reseta os registradores de apontamento
        MAR = "0";
        IMM = "0";
        IR = "0";
        RO0 = "0";
        RO1 = "0";
        RO2 = "0";
        //MBR recebe a instrucao da memoria referente a posicao indicada por PC
        if(p < mem.length){
            MBR = parseInt(mem[p], 2).toString(16);
            srch = true;
        }else{
            console.log("Position not found on Memory")
        }
    //Verifica se ja foi feito a codificacao do conteudo da MBR
    }else if(deco == false){
        var mb = "";
        var l = parseInt(MBR, 16).toString(2);
        if(l.length < 32){
            for(var i = 0; i < (32 - l.length); i++){
                mb += "0";
            }
            mb += l;
        }
        for(var j = 0; j < mb.length; j++){
            word += mb.charAt(j);
            //Salva o opcode em IR
            if(j == 4){
                IR = ""
                IR = parseInt(word, 2).toString(16);
                word = ""
            }
            //Salva o primeiro registrador em RO0
            if(j == 6){
                RO0 = parseInt(word, 2).toString(16);
                word = "";
            }
            //Verifica se usa IMM ou quantos registradores sao usados cm o opcode em IR
            var found = "0";
            console.log("IR: "+IR)
            var l = bin2op.get(hex2bin.get(IR));
            console.log(l);
            for (var i = 0; i < opreg1.length && found == "0"; i++) {
                if (opreg1[i] == l) {
                    found = "1";
                    for (var k = 0; k < opregImm.length && found == "1"; k++) {
                        if (opregImm[k] == l) {
                            found = "IMM";
                            break;
                        }
                    }
                    break;
                }
                else if (opreg2[i] == l) {
                    found = "2";
                    break;
                }
                else if (opreg3[i] == l) {
                    found = "3";
                    break;
                }
            }
            //Caso retorne 1 ou IMM, pega o restante da palavra e salva em MAR ou IMM de acordo com o retorno
            if(found == "1" || found == "IMM"){
                if(j == (mb.length - 1)){
                    console.log("CHEGUEI");
                    if(found == "IMM"){
                        console.log("IMM");
                        IMM = parseInt(word, 2).toString(16);
                        word = "";
                    }else{
                        console.log("MAR");
                        MAR = parseInt(word, 2).toString(16);
                        word = "";
                    }
                }
            //Caso retorne 2, salva o segundo registrador em RO1
            }else if(found == "2"){
                if(j == 8){
                    RO1 = parseInt(word, 2).toString(16);
                    word = "";
                }
            //Caso retorne 3, salva o segundo registrador em RO1 e o terceiro em RO2
            }else if(found == "3"){
                if(j == 8){
                    RO1 = parseInt(word, 2).toString(16);
                    word = "";
                }
                if(j == 10){
                    RO2 = parseInt(word, 2).toString(16);
                    word = "";
                }
            }
            deco = true;
        }
    //Se ja estiver sido decodificado, executa a funcao de acordo com o IR
    }else{
        var ir = "";
        for(var i = 0; i < (5 - parseInt(IR,16).toString(2).length); i++){
            ir += "0";
        }
        ir += parseInt(IR,16).toString(2);
        switch(bin2op.get(ir)){
            case "ld":
                load(parseInt(RO0, 16).toString(2), parseInt(MAR, 16));
                break;
            case "st":
                store(parseInt(RO0, 16).toString(2), parseInt(MAR, 16));
                break;
            case "add":
                add(parseInt(RO0, 16).toString(2), parseInt(RO1, 16).toString(2), parseInt(RO2, 16).toString(2));
                break;
            case "sub":
                sub(parseInt(RO0, 16).toString(2), parseInt(RO1, 16).toString(2), parseInt(RO2, 16).toString(2));
                break;
            case "div":
                div(parseInt(RO0, 16).toString(2), parseInt(RO1, 16).toString(2), parseInt(RO2, 16).toString(2));
                break;
            case "lsh":
                leftShift(parseInt(RO0, 16).toString(2), parseInt(IMM, 16).toString(2));
                break;
            case "rsh":
                rightShift(parseInt(RO0, 16).toString(2), parseInt(IMM, 16).toString(2));
                break;
            case "cmp":
                compare(parseInt(RO0, 16).toString(2), parseInt(RO1, 16).toString(2));
                break;
            case "je":
                jumpEqual(parseInt(MAR, 16));
                break;
            case "jne":
                jumpNotEqual(parseInt(MAR, 16));
                break;
            case "jl":
                jumpLow(parseInt(MAR, 16));
                break;
            case "jle":
                jumpLowEqual(parseInt(MAR, 16));
                break;
            case "jg":
                jumpGreater(parseInt(MAR, 16));
                break;
            case "jge":
                jumpGreaterEqual(parseInt(MAR, 16));
                break;
            case "jmp":
                jump(parseInt(MAR, 16));
                break;
            case "movih":
                movImmH(parseInt(RO0, 16).toString(2), parseInt(IMM, 16).toString(2));
                break;
            case "movil":
                movImmL(parseInt(RO0, 16).toString(2), parseInt(IMM, 16).toString(2));
                break;
            case "addi":
                addImm(parseInt(RO0, 16).toString(2), parseInt(IMM, 16).toString(2));
                break;
            case "subi":
                subImm(parseInt(RO0, 16).toString(2), parseInt(IMM, 16).toString(2));
                break;
            case "muli":
                mulImm(parseInt(RO0, 16).toString(2), parseInt(IMM, 16).toString(2));
                break;
            case "divi":
                divImm(parseInt(RO0, 16).toString(2), parseInt(IMM, 16).toString(2));
                break;
            case "movrr":
                movRegReg(parseInt(RO0, 16).toString(2), parseInt(RO1, 16).toString(2));
                break;
            default:
                console.log("Opcode nao encontrado");
                break;
        }
        srch = false;
        deco = false;
        //Incrementa PC
        p += 1;
        PC = p.toString(2);

    }
    //Atualiza os registradores e o botao que roda o programa
    registrator();
    btnrun = document.getElementById("run");
    if(srch == false){
        btnrun.textContent = "Search";
    }else if(deco == false){
        btnrun.textContent = "Decodify";
    }else{
        btnrun.textContent = "Execute";
    }
}
