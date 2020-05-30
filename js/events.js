



function pressButton(){
    document.getElementById('body').textContent='';

    //Ricavo dati
    risorseTotali=[];
    for(var i=0;i<nRisorse;i++){
        var maxResCell=document.getElementById("maxres-"+i);
        risorseTotali.push(parseInt(maxResCell.value));
    }
    for(var i=0;i<nRisorse;i++){
        for(var j=0;j<nProcessi;j++){
        richiesteMinime[j][i]=parseInt(document.getElementById("minreq-"+j+"-"+i).value);
        }
    }
    for(var i=0;i<nRisorse;i++){

        for(var j=0;j<nProcessi;j++){
            risorseNecessarie[j][i]=parseInt(document.getElementById("needreq-"+j+"-"+i).value);
        }
    }

    var tentativi = tentativiConSuccesso(nRisorse, nProcessi, risorseTotali, richiesteMinime, risorseNecessarie);
    tentativiMinimi=trovaMinimi(tentativi);

    resultCounter=0;
    refreshResult(0);
}


//ID lista, valore selezionato
function changeList(id,value){
    if(id=='nrisorse'){
        nRisorse=parseInt(value);
    }else nProcessi=parseInt(value);
    refreshInput();
}