var Memory = document.getElementById("memory");
var el = '';
for(var i = 0; i < 100; i++){
    if(i == 0){
        el += '<div class="row"><div class="input-group col"><div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">'+ i.toString(16).toUpperCase() + '</span></div><input class="form-control value" type="text" placeholder="0000 0000 0000 0000 0000 0000 0000 0000" readonly></div>'
    }
    else if(i % 2 == 0){
        el += '</div>\n<div class="row"><div class="input-group col"><div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">'+ i.toString(16).toUpperCase() + '</span></div><input class="form-control value" type="text" placeholder="0000 0000 0000 0000 0000 0000 0000 0000" readonly></div>'
    }else{
        el +='<div class="input-group col"><div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">'+ i.toString(16).toUpperCase() + '</span></div><input class="form-control value" type="text" placeholder="0000 0000 0000 0000 0000 0000 0000 0000" readonly></div>';
    }
    Memory.innerHTML = el;
}


    