function creaTabellaTentativo(tentativo){
            var body = document.getElementById('body');
            var i=0;
            for(x of tentativo){//x Ã¨ la matrice risorse/processi
                var parSeparazione=document.createElement('p');
                parSeparazione.innerHTML='tentativo n.'+i;
                body.appendChild(parSeparazione);
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
                        console.log(colonne);
                        td.innerHTML=colonne;
                        tr.appendChild(td);
                    }
                    tabella.appendChild(tr);


                    irighe++;//indice righe fatte per intestazione lato
                }
                body.appendChild(tabella);
                i++;
            }
    
        }
    var nRisorse = 3;                            //Il numero di risorse, da cambiare
    var nProcessi = 3;                          //Il numero di processi, da cambiare
    var risorseTotali = [8, 7, 5];                      //Array con il totale di ogni risorsa disponibile
    var richiesteMinime = [[2, 2, 1],
                           [1, 2, 1],
                           [2, 1, 1]];                    //Matrice (rige processi, colonne risorse) contenente le richieste minime di ogni processo
    var risorseNecessarie = [[4, 4, 2],
                             [2, 4, 2],
                             [4, 2, 2]];                  //Matrice (rige processi, colonne risorse) contenente il numero di risorse necessarie a un processo per terminare
    
    
    var tentativi = tentativiConSuccesso(nRisorse, nProcessi, risorseTotali, richiesteMinime, risorseNecessarie);
    for(x of tentativi){
        creaTabellaTentativo(x);
    }
    
    
    function tentativiConSuccesso(nRisorse, nProcessi, risorseTotali, richiesteMinime, risorseNecessarie) {
        var allocazione = [];
        var gentes = [];                            //Famiglie romane -> Array di tentativi
        var karma = [];                             //A chi dare la colpa -> Array di tutte le allocazioni testate
        var alberoGenealogicoAdamoEdEva = [];       //Lista dei discendenti di Adamo ed Eva -> Array degli id di tutte le allocazioni ordinate per parentela
        var generazione = 0;                        //Gen Z -> L'id da assegnare all'allocazione attuale
    
        for (var p = 0; p < nProcessi; p++) {
            var temp = [];
            for (var r = 0; r < nRisorse; r++)
                temp.push(0);
            allocazione.push(temp);
        }
    
        ricorsione(allocazione, -1);
    
        return gentes;
    
        function ricorsione(allocazione, idPadre) {
            var id;
            var combinazioni = [];
            
            if (deadLock(allocazione))
                return false;
    
            terminaProcessi(allocazione);
    
            if (tuttiTerminati(allocazione))
                return true;
            id = generazione;
            generazione++;
            karma.push(allocazione);
            alberoGenealogicoAdamoEdEva.push(idPadre);
    
            for (var p of allocazione)
                combinazioni.push(p[0]);
            combinazioni = numerini(combinazioni);
            for (var comb of combinazioni) {
                var all1 = allocazione;
                for (var p of comb) {
                    all1 = nextAllocazione(all1, p);
                }
                if (ricorsione(all1, id))
                    gentes.push(alberoGenealogico(id));
            }
        }
    
        function numerini(listina) {
            numeriniBelli = [];
            for (var i = 0; i < listina.length; i++)
                if (listina[i] != -1)
                    numeriniBelli.push(i);
    
            return combine(numeriniBelli);
        }
    
        function combine(arr) {
            function fn(n, src, got, all) {
                if (n == 0) {
                    if (got.length > 0) {
                        all[all.length] = got;
                    }
                    return;
                }
                for (var j = 0; j < src.length; j++) {
                    fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
                }
                return;
            }
            var all = [];
            for (var i = 1; i < arr.length; i++) {
                fn(i, arr, [], all);
            }
            all.push(arr);
    
            return all;
        }
    
        function alberoGenealogico(idPronipote) {
            var gens = [karma[idPronipote]];
            var suoPadre = alberoGenealogicoAdamoEdEva[idPronipote];
            while (!paterFamilias(suoPadre)) {
                gens.push(karma[suoPadre]);
                suoPadre = alberoGenealogicoAdamoEdEva[suoPadre];
            }
            return gens;
        }
    
        function paterFamilias(idUmano) {
            return idUmano == -1;
        }
    
        function tuttiTerminati(allocazione) {
            for (var p of allocazione)
                if (p[0] != -1)
                    return false;
            return true;
        }
    
        function terminaProcessi(allocazione) {
            for (var p = 0; p < nProcessi; p++) {
                for (var r = 0; r < nRisorse + 1; r++) {
                    if (r == nRisorse)
                        allocazione[p].fill(-1);
                    if (allocazione[p][r] < risorseNecessarie[p][r])
                        break;
                }
            }
        }
    
        function nextAllocazione(prevAll, iProcesso) {
            var nextAll = [];
            for (var p = 0; p < nProcessi; p++) {
                var nextProc = [];
                for (var r = 0; r < nRisorse; r++) {
                    nextProc.push(prevAll[p][r])
                    if (p == iProcesso)
                        nextProc[r] += richiesteMinime[p][r];
                }
                nextAll.push(nextProc);
            }
            return nextAll;
        }
    
        function deadLock(allocazione) {
            for (var r = 0; r < nRisorse; r++) {
                var tot = 0;
                for (var p = 0; p < nProcessi; p++) {
                    if (allocazione[p][r] != -1)
                        tot += allocazione[p][r];
                }
                if (tot > risorseTotali[r])
                    return true;
            }
            return false;
        }
    }