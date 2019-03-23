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

var srch = false;
var deco = false;

//Funcao q inicializa os registradores com 0
function regInit(){
    E = 0;
    L = 0;
    G = 0;
    R0 = "0000 0000 0000 0000 0000 0000 0000 0000";
    R1 = "0000 0000 0000 0000 0000 0000 0000 0000";
    R2 = "0000 0000 0000 0000 0000 0000 0000 0000";
    R3 = "0000 0000 0000 0000 0000 0000 0000 0000";
    MBR = "0000 0000 0000 0000 0000 0000 0000 0000";
    IMM = "0000 0000 0000 0000 0000 0000 0000 0000";
    IR = "00000";
    RO0 = "00";
    RO1 = "00";
    RO2 = "00";
    PC = "0";
    MAR = "0000 0000 0000 0000 0000 0000 0000 0000";
    registrator();
}
//Funcao q mostra (atualiza) os registradores na pag
function registrator(){
    var r0 = document.getElementById('r0').placeholder = R0;
    var r1 = document.getElementById('r1').placeholder = R1;
    var r2 = document.getElementById('r2').placeholder = R2;
    var r3 = document.getElementById('r3').placeholder = R3;
    var mbr = document.getElementById('mbr').placeholder = MBR;
    var imm = document.getElementById('imm').placeholder = IMM;
    var ir = document.getElementById('ir').placeholder = IR;
    var ro0 = document.getElementById('ro0').placeholder = RO0;
    var ro1 = document.getElementById('ro1').placeholder = RO1;
    var ro2 = document.getElementById('ro2').placeholder = RO2;
    var pc = document.getElementById('pc').placeholder = PC;
    var mar = document.getElementById('mar').placeholder = MAR;
}


//Funcao q inicializa a memoria com 0 em todos os enderecos
function memInit(){
    for(var i = 0; i < 100; i++){
        mem[i] = "0000 0000 0000 0000 0000 0000 0000 0000";
    }
    regInit();
    memory();
}

//Funcao q mostra (atualiza) a memoria na pag
function memory(){
    var m;
    for(var i = 0; i < 100; i++){
        if(mem[i] == undefined){
            memInit();
            regInit();
        }
        m = document.getElementById(i.toString());
        m.placeholder = mem[i];
    }
    registrator();
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

function load(regX, M){
    M = M.split(" ").join("");
    if(regX == '00'){
        R0 = mem[parseInt(M,2)];
    }else if(regX == '01'){
        R1 = mem[parseInt(M,2)];
    }else if(regX == '10'){
        R2 = mem[parseInt(M,2)];
    }else if(regX == "11"){
        R3 = mem[parseInt(M,2)];
    }else{
        console.log('Registrator not found');
    }
    
}
function store(regX, M){
    M = M.split(" ").join("");
    if(regX == '00'){
        mem[parseInt(M,2)] = R0;
    }else if(regX ==
         '01'){
        mem[parseInt(M,2)] = R1;
    }else if(regX == '10'){
        mem[parseInt(M,2)] = R2;
    }else if(regX == "11"){
        mem[parseInt(M,2)] = R3;
    }else{
        console.log('Registrator not found');
    }
}
function add(regX, regY, regZ){
    regY = parseInt(regReturn(regY), 2);
    regZ = parseInt(regReturn(regZ), 2);
    console.log("R0: " + R0);
    console.log("R1: " + R1);
    console.log("R2: " + R2);
    console.log("R3: " + R3);
    console.log("REGY: " + regReturn(regY));
    console.log("REGZ: " + regReturn(regZ));
    if(regX == '00'){
        R0 = regY + regZ;
    }else if(regX == '01'){
        R1 = regY + regZ;
    }else if(regX == '10'){
        R2 = regY + regZ;
    }else if(regX == "11"){
        R3 = regY + regZ;
    }else{
        console.log('Registrator not found');
    }
}
function sub(regX, regY, regZ){
    regY = parseInt(regReturn(regY), 2);
    regZ = parseInt(regReturn(regZ), 2);
    if(regX == '00'){
        R0 = regY - regZ;
    }else if(regX == '01'){
        R1 = regY - regZ;
    }else if(regX == '10'){
        R2 = regY - regZ;
    }else if(regX == "11"){
        R3 = regY - regZ;
    }else{
        console.log('Registrator not found');
    }
}
function mul(regX, regY, regZ){
    regY = parseInt(regReturn(regY), 2);
    regZ = parseInt(regReturn(regZ), 2);
    if(regX == '00'){
        R0 = regY * regZ;
    }else if(regX == '01'){
        R1 = regY * regZ;
    }else if(regX == '10'){
        R2 = regY * regZ;
    }else if(regX == "11"){
        R3 = regY * regZ;
    }else{
        console.log('Registrator not found');
    }
}
function div(regX, regY, regZ){
    regY = parseInt(regReturn(regY), 2);
    regZ = parseInt(regReturn(regZ), 2);
    if(regX == '00'){
        R0 = regY / regZ;
    }else if(regX == '01'){
        R1 = regY / regZ;
    }else if(regX == '10'){
        R2 = regY / regZ;
    }else if(regX == "11"){
        R3 = regY / regZ;
    }else{
        console.log('Registrator not found');
    }
}
function leftShift(regX, imm){
    var zero = "";
    for(var i = 0; i< imm; i++){
        zero += "0";
    }
    if(regX == '00'){
        for(var i = 0; i < R0.length; i++){
            if(i < imm){
                R0.replace(charAt(i), "");
            }
        }
        R0 = R0 + zero;
    }else if(regX == '01'){
        for(var i = 0; i < R1.length; i++){
            if(i < imm){
                R1.replace(charAt(i), "");
            }
        }
        R1 = R1 + zero;
    }else if(regX == '10'){
        for(var i = 0; i < R2.length; i++){
            if(i < imm){
                R2.replace(charAt(i), "");
            }
        }
        R2 = R2 + zero;
    }else if(regX == "11"){
        for(var i = 0; i < R3.length; i++){
            if(i < imm){
                R3.replace(charAt(i), "");
            }
        }
        R3 = R3 + zero;
    }else{
        console.log('Registrator not found');
    }
}
function rightShift(regX, imm){
    var zero = "";
    for(var i = 0; i< imm; i++){
        zero += "0";
    }
    imm = 32 - imm;
    if(regX == '00'){
        for(var i = R0.length; i > imm; i--){
            if(i > imm){
                R0.replace(charAt(i), "");
            }
        }
        R0 = zero + R0;
    }else if(regX == '01'){
        for(var i = R1.length; i > imm; i--){
            if(i > imm){
                R1.replace(charAt(i), "");
            }
        }
        R1 = zero + R1;
    }else if(regX == '10'){
        for(var i = R2.length; i > imm; i--){
            if(i > imm){
                R2.replace(charAt(i), "");
            }
        }
        R2 = zero + R2;
    }else if(regX == "11"){
        for(var i = R3.length; i > imm; i--){
            if(i > imm){
                R3.replace(charAt(i), "");
            }
        }
        R3 = zero + R3;
    }else{
        console.log('Registrator not found');
    }

}
function compare(regX, regY){
    regY = parseInt(regReturn(regY), 2);
    regX = parseInt(regReturn(regX), 2);
    if(regX == regY){
        E = 1;
    }else if(regX > regY){
        L = 1;
    }else{
        G = 1;
    }
}
function jumpEqual(M){
    if(E){
        PC = M;
    }
}
function jumpNotEqual(M){
    if(!E){
        PC = M;
    }
}
function jumpLow(M){
    if(L){
        PC = M;
    }
}
function jumpLowEqual(M){
    if(L || E){
        PC = M;
    }
}
function jumpGreater(M){
    if(G){
        PC = M;
    }
}
function jumpGreaterEqual(M){
    M = M.split(" ").join("");
    if(G || E){
        PC = M;
    }
}
function jump(M){
    M = M.split(" ").join("");
    PC = M;
}
function movImmH(regX, Imm){
    for(var i = 0; i< Imm.length; i++){
        if(i > 16){
            if(regX == "00"){
                R0.replace(R0.charAt(i),Imm.charAt(i));
            }else if(regX == "01"){
                R1.replace(R1.charAt(i),Imm.charAt(i));                
            }else if(regX == "10"){
                R2.replace(R2.charAt(i),Imm.charAt(i));
            }else if(regX == "11"){
                R3.replace(R3.charAt(i),Imm.charAt(i));
            }else{
                console.log("Registrador nao encontrado")
            }
        }
    }
}
function movImmL(regX, Imm){
    regX = regReturn(regX);
    for(var i = 0; i< Imm.length; i++){
        if(i <= 16){
            if(regX == "00"){
                R0.replace(R0.charAt(i),Imm.charAt(i));
            }else if(regX == "01"){
                R1.replace(R1.charAt(i),Imm.charAt(i));                
            }else if(regX == "10"){
                R2.replace(R2.charAt(i),Imm.charAt(i));
            }else if(regX == "11"){
                R3.replace(R3.charAt(i),Imm.charAt(i));
            }else{
                console.log("Registrador nao encontrado")
            }
        }
    }
}
function addImm(regX, Imm){
    if(regX == "00"){
        R0 = R0 + Imm;
    }else if(regX == "01"){
        R1 = R1 + Imm;
    }else if(regX == "10"){
        R2 = R2 + Imm;
    }else if(regX == "11"){
        R3 = R3 + Imm;
    }else{
        console.log("Registrador nao encontrado")
    }
}
function subImm(regX, Imm){
    if(regX == "00"){
        R0 = R0 - Imm;
    }else if(regX == "01"){
        R1 = R1 - Imm;
    }else if(regX == "10"){
        R2 = R2 - Imm;
    }else if(regX == "11"){
        R3 = R3 - Imm;
    }else{
        console.log("Registrador nao encontrado")
    }
}
function mulImm(regX, Imm){
    if(regX == "00"){
        R0 = R0 * Imm;
    }else if(regX == "01"){
        R1 = R1 * Imm;
    }else if(regX == "10"){
        R2 = R2 * Imm;
    }else if(regX == "11"){
        R3 = R3 * Imm;
    }else{
        console.log("Registrador nao encontrado")
    }
}
function divImm(regX, Imm){
    if(regX == "00"){
        R0 = R0 / Imm;
    }else if(regX == "01"){
        R1 = R1 / Imm;
    }else if(regX == "10"){
        R2 = R2 / Imm;
    }else if(regX == "11"){
        R3 = R3 / Imm;
    }else{
        console.log("Registrador nao encontrado")
    }
}
function movRegReg(regX, regY){
    regY = parseInt(regReturn(regY), 2);
    if(regX == "00"){
        R0 = regY;
    }else if(regX == "01"){
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

var opreg1 = ["ld", "st", "lsh", "rsh", "je", "jne", "jl", "jle", "jg", "jge", "jmp", "movih", "movil", "addi", "subi", "muli", "divi"];
var opregImm = ["movih", "movil", "addi", "subi", "muli", "divi"];
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
                if(op2bin.has(wrd[t])){ 
                    word = op2bin.get(wrd[t]);
                }else if(reg2bin.has(wrd[t])){
                    word += reg2bin.get(wrd[t]);
                }else{
                    word += addImm(wrd[t]);
                }

                if(wrd[t+1] == undefined || op2bin.has(wrd[t+1])){
                    if(word != ""){
                        while(word.length < 32){
                            word += "0";
                        }
                        var word1 = word;
                        word = ""
                        //Separa a palavra de 4 em 4 bits
                        for(var k = 1; k <= word1.length; k++){
                            if(k!= 1 && k % 4 == 0){
                                word += word1[k-1];
                                word += " ";
                            }else{
                                word += word1[k-1];
                            }
                        }
                        //Salva a palavra na memoria
                        mem[i] = word;
                    }
                    word = "";
                }
                memory()
            }
        }
        
    };    
};
compile();
function run(){
    var word = "";
    PC = parseInt(PC,2);
    if(srch == false){
        if(PC < mem.length){
            MBR = mem[PC];
            srch = true;
            PC = PC.toString(2);
            registrator();
        }
    }else if(deco == false){
        var mb = MBR.split(" ").join("")
        for(var j = 0; j < MBR.length; j++){
            word += mb.charAt(j);
            console.log(mb);
            if(j == 4){
                IR = ""
                IR = word.split(" ").join("")
                word = ""
            }
            if(j == 6){
                RO0 = word;
                word = "";
            }
            var found = "0";
            var l = bin2op.get(IR);
            for (var i = 0; i < opreg1.length && found == "0"; i++) {
                if (opreg1[i] == l) {
                    found = "1";
                    for (var k = 0; k < opregImm.length && !found; k++) {
                        if (opregImm[k] == l) {
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
            if(found == "1" || found == "IMM"){
                if(j == (MBR.length - 1)){
                    if(found == "IMM"){
                        IMM = word;
                        word = "";
                    }else{
                        MAR = word;
                        word = "";
                    }
                }
            }else if(found == "2"){
                if(j == 8){
                    RO1 = word;
                    word = "";
                }
            }else if(found == "3"){
                if(j == 8){
                    RO1 = word;
                    console.log(RO1);
                    word = "";
                }
                if(j == 10){
                    RO2 = word;
                    console.log(RO2);
                    word = "";
                }
            }
            deco = true;
            PC = PC.toString(2);
            registrator();
        }
    }else{
        switch(bin2op.get(IR)){
            case "ld":
                load(RO0, MAR);
                break;
            case "st":
                store(RO0, MAR);
                break;
            case "add":
                add(RO0, RO1, RO2);
                break;
            case "sub":
                sub(RO0, RO1, RO2);
                break;
            case "div":
                div(RO0, RO1, RO2);
                break;
            case "lsh":
                leftShift(RO1, RO2);
                break;
            case "rsh":
                rightShift(RO1, RO2);
                break;
            case "cmp":
                compare(RO0, RO1);
                break;
            case "je":
                jumpEqual(MAR);
                break;
            case "jne":
                jumpNotEqual(MAR);
                break;
            case "jl":
                jumpLow(MAR);
                break;
            case "jle":
                jumpLowEqual(MAR);
                break;
            case "jg":
                jumpGreater(MAR);
                break;
            case "jge":
                jumpGreaterEqual(MAR);
                break;
            case "jmp":
                jump(MAR);
                break;
            case "movih":
                movImmH(RO0, IMM);
                break;
            case "movil":
                movImmL(RO0, IMM);
                break;
            case "addi":
                addImm(RO0, IMM);
                break;
            case "subi":
                subImm(RO0, IMM);
                break;
            case "muli":
                mulImm(RO0, IMM);
                break;
            case "divi":
                divImm(RO0, IMM);
                break;
            case "movrr":
                movRegReg(RO0, RO1);
                break;
            default:
                console.log("Opcode nao encontrado");
                break;
        }
        PC = parseInt(PC, 2);
        PC += 1;
        PC = PC.toString(2);
        registrator();
        srch = false;
        deco = false;
    }
    btnrun = document.getElementById("run");
    if(srch == false){
        btnrun.textContent = "Search";
    }else if(deco == false){
        btnrun.textContent = "Decodify";
    }else{
        btnrun.textContent = "Execute";
    }
}
