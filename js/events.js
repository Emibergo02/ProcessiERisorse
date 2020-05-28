



function pressButton(){
    creaTabellaInserimento(document.getElementById("input-table"),'minreq',nProcessi,nRisorse);
    creaTabellaInserimento(document.getElementById("input-table"),'needreq',nProcessi,nRisorse);
    var tentativi = tentativiConSuccesso(nRisorse, nProcessi, risorseTotali, richiesteMinime, risorseNecessarie);
    for(prova of trovaMinimi(tentativi)){
        creaTabellaTentativo(prova);
    }
}


//ID lista, valore selezionato
function changeList(id,value){
    if(id=='nrisorse'){
        nRisorse=parseInt(value);
    }else nProcessi=parseInt(value);
}