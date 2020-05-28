
var nRisorse = 3;                            //Il numero di risorse, da cambiare
var nProcessi = 3;                          //Il numero di processi, da cambiare
var risorseTotali = [8, 7, 5];                      //Array con il totale di ogni risorsa disponibile
var richiesteMinime = [[2, 2, 1],
                   [1, 2, 1],
                   [2, 1, 1]];                    //Matrice (rige processi, colonne risorse) contenente le richieste minime di ogni processo
var risorseNecessarie = [[4, 4, 2],
                     [2, 4, 2],
                     [4, 2, 2]];                  //Matrice (rige processi, colonne risorse) contenente il numero di risorse necessarie a un processo per terminare

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

function pressButton(){
    creaTabellaInserimento(document.getElementById("test"),'minreq',3,3);
    creaTabellaInserimento(document.getElementById("test"),'needreq',3,3);
    var tentativi = tentativiConSuccesso(nRisorse, nProcessi, risorseTotali, richiesteMinime, risorseNecessarie);
    for(prova of trovaMinimi(tentativi)){
        creaTabellaTentativo(prova);
    }
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



