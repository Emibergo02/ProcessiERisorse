
var nRisorse = 3;                            //Il numero di risorse, da cambiare
var nProcessi = 3;                          //Il numero di processi, da cambiare
var risorseTotali = [8, 7, 5];                     //Array con il totale di ogni risorsa disponibile
var richiesteMinime = [[2, 2, 1],
                   [1, 2, 1],
                   [2, 1, 1]];                    //Matrice (rige processi, colonne risorse) contenente le richieste minime di ogni processo
var risorseNecessarie = [[4, 4, 2],
                     [2, 4, 2],
                     [4, 2, 2]];                  //Matrice (rige processi, colonne risorse) contenente il numero di risorse necessarie a un processo per terminare
var tentativiMinimi=[];
var resultCounter=0;

//ritorna int
function trovaMinimi(listaTentativi){
    var lunminima = listaTentativi[0].length;
    var minimi=[];
    for(lista of listaTentativi){
        if(lista.length<lunminima){
            lunminima = lista.length;
            minimi=[];
            minimi.push(lista);
        }
        if(lista.length==lunminima){
            minimi.push(lista);
        }
    }

    return minimi;

}

function refreshResult(modifier){

    const elementDiv = document.getElementById("body");
    elementDiv.textContent='';

    if(resultCounter >= tentativiMinimi.length)resultCounter=0;
    else if(resultCounter < 0)resultCounter=tentativiMinimi.length-1;

    creaTabellaTentativo(tentativiMinimi[resultCounter]);
    resultCounter+=modifier;

    var pulsanteSinistra=document.createElement("button");
    pulsanteSinistra.setAttribute("onclick","refreshResult(-1)");
    pulsanteSinistra.innerText='<-';
    var pulsanteDestra=document.createElement("button");
    pulsanteDestra.setAttribute("onclick","refreshResult(1)");
    pulsanteDestra.innerText='->';

    elementDiv.appendChild(pulsanteSinistra);
    elementDiv.appendChild(pulsanteDestra);
}


function refreshInput(){
    const elementContainer =document.getElementById("input-table");
    elementContainer.textContent='';

    //Risorse disponibili
    var par1=document.createElement("p");
    par1.innerText="Risorse diponibili";
    elementContainer.appendChild(par1);
    var tabella = document.createElement("table");
    var testa = document.createElement("thead");
    var corpo = document.createElement("tbody");

    var riga = document.createElement('tr');
    for(var i=0;i<nRisorse;i++){
        var colonna=document.createElement("td");
        colonna.innerHTML="r"+(i+1);
        
        riga.appendChild(colonna);
    }
    testa.appendChild(riga);
    
    var riga=document.createElement("tr");
    for(var i=0;i<nRisorse;i++){
        var colonna=document.createElement("td");

        var input=document.createElement('input');
        input.setAttribute("type",'text');
        input.setAttribute("id","maxres"+"-"+i);
        colonna.appendChild(input);
            
        riga.appendChild(colonna);
    }
    corpo.appendChild(riga);
    //Fine
    tabella.appendChild(testa);
    tabella.appendChild(corpo);
    elementContainer.appendChild(tabella);

    //Par per nome tabelle
    var par1=document.createElement("p");
    par1.innerText="Risorse minime";
    var par2=document.createElement("p");
    par2.innerText="Risorse necessarie";

    //Scrivo tabelle
    elementContainer.appendChild(par1);
    creaTabellaInserimento(elementContainer,'minreq',nProcessi,nRisorse);
    elementContainer.appendChild(par2);
    creaTabellaInserimento(elementContainer,'needreq',nProcessi,nRisorse);
}



//Contenitore, id tabella, nrighe, ncolonne
function creaTabellaInserimento(container,id,rows,cols){
    var contenitore = container;
    var tabella = document.createElement("table");
    var testa = document.createElement("thead");
    var corpo = document.createElement("tbody");

    
    //Intestazione
    var riga = document.createElement('tr');
    for(var i=0;i<cols+1;i++){
        var colonna=document.createElement("td");
        if(i==0){
            colonna.innerHTML="+";
        }else{
            colonna.innerHTML="r"+i;
        }
        riga.appendChild(colonna);
    }
    testa.appendChild(riga);

    //Corpo
    for(var j=0;j<rows;j++){
        var riga=document.createElement("tr");
        for(var i=0;i<cols+1;i++){
            var colonna=document.createElement("td");
            if(i==0){
                colonna.innerHTML="p"+(j+1);
            }else{
                var input=document.createElement('input');
                input.setAttribute("type",'text');
                input.setAttribute("id",id+'-'+j+"-"+(i-1));
                colonna.appendChild(input);
            }
            riga.appendChild(colonna);
        }
        corpo.appendChild(riga);
    }

    //Tabella
    tabella.appendChild(testa);
    tabella.appendChild(corpo);
    contenitore.appendChild(tabella);


}


function creaTabellaTentativo(tentativo){
    var body = document.getElementById('body');
    var counter=0;
    //Contenitore tabella
    var tableContainer=document.createElement('div');
    tableContainer.setAttribute('style','display:flex; flex-direction: row; justify-content: center; align-items: center;');
    //TODO: mettere la linea sopra su .css


    for(x of tentativo){//x Ã¨ la matrice risorse/processi



        //Paragrafo n tentativo
        var parSeparazione=document.createElement('p');
        parSeparazione.innerHTML='allocazione n.'+counter;
        tableContainer.appendChild(parSeparazione);

        //Tabella
        var tabella = document.createElement("table");
        

        //Intestazione alta
        var Intestazionealta= document.createElement("thead");
        var Intestazionealtariga=document.createElement('tr');

        var vuoto=document.createElement('th');//spazietto vuoto tabella
        Intestazionealtariga.appendChild(vuoto);

        for(var i=1;i<x.length+1;i++){
            var Intestazionealta1=document.createElement('th');
            Intestazionealta1.innerHTML='r'+i;
            Intestazionealtariga.appendChild(Intestazionealta1);
        }
        Intestazionealta.appendChild(Intestazionealtariga);
        tabella.appendChild(Intestazionealta);
        //Fine intestazione alta

        
        var irighe=1;//indice righe fatte per intestazione lato

        for(righe of x){//righe Ã¨ risore o processi
            var tr = document.createElement('tr');

            //Intestazione lato
            var Intlato=document.createElement("td");
            Intlato.innerHTML="p"+irighe;
            tr.appendChild(Intlato);
            //Fine ilato

            for(colonne of righe){//colonne Ã¨ processi o risorse
                var td = document.createElement('td');
                td.innerHTML=colonne;
                tr.appendChild(td);
            }
            tabella.appendChild(tr);


            irighe++;//indice righe fatte per intestazione lato
        }

        tableContainer.appendChild(tabella);
        
        
        counter++;
    }
    body.appendChild(tableContainer);

}




