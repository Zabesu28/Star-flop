let nbResults = document.querySelector('#nbResults');
let planetes = 'https://swapi.dev/api/planets';

let tableau = document.querySelector('#tableau');
let previous = document.querySelector('#previous');
let next = document.querySelector('#next');
let page = document.querySelector('#page');

let listPlanets;
let idxPage;

let select = document.querySelector('#select-planete');

select.addEventListener('change', getPlanetes);


getPlanetes(select.value);

previous.addEventListener('click', function () {
    if(!listPlanets.previous){
        alert("Vous êtes à la première page")
    }
    else{
        fetch(listPlanets.previous)
        .then(response => response.json())
        .then(response => {
          listPlanets = response
          idxPage--;
          initPlanets(listPlanets.results);
        });
    }
});

next.addEventListener('click', function () {
    if(!listPlanets.next){
        alert("Vous êtes à la dernière page")
    }
    else{
        fetch(listPlanets.next)
        .then(response => response.json())
        .then(response => {
          listPlanets = response
          idxPage++;
          initPlanets(listPlanets.results);
        });
    }
    
});

function initPlanets(listPlanets){
    tableau.innerHTML = "";
    initTitleTableau();


    listPlanets.forEach(planete => {
        var div = document.createElement("div");
        div.classList.add("flex-column");
        var nom = document.createElement("h4");
        var terrain = document.createElement("h4");
        nom.textContent = planete.name;
        terrain.textContent = planete.terrain;
        div.appendChild(nom);
        div.appendChild(terrain);
        tableau.appendChild(div);
        page.textContent = "Page "+ idxPage;


        Array.from(tableau.children).forEach(function(child) {
            child.addEventListener('click', function () {
                Array.from(tableau.children).forEach(function(child) {
                    child.classList.remove("selected");
                });

                child.classList.add("selected");
                
                if(planete.name == child.children[0].textContent){
                    var info = document.querySelector('#info');
                    var pasInfo = document.querySelector('#pas-info');

                    info.classList.remove("none");
                    pasInfo.classList.add("none");

                    var titre = document.querySelector('#titre-planete');
                    var population = document.querySelector('#population-planete');
                    var diametre = document.querySelector('#diametre');
                    var climat = document.querySelector('#climat');
                    var gravite = document.querySelector('#gravite');
                    var terrain = document.querySelector('#terrain');

                    titre.textContent = planete.name;
                    population.innerHTML = "<span>Population : </span>" + planete.population
                    diametre.textContent = planete.diameter
                    climat.textContent = planete.climate
                    gravite.textContent = planete.gravity
                    terrain.textContent = planete.terrain

                }
            });
        });
    });
}

function initTitleTableau(){
    var div = document.createElement("div");
    div.classList.add("flex-column");
    var nomTitle = document.createElement("h3");
    var terrainTitle = document.createElement("h3");
    nomTitle.textContent = "Nom";
    terrainTitle.textContent = "Terrain";
    div.appendChild(nomTitle);
    div.appendChild(terrainTitle);
    tableau.appendChild(div);
}

function getPlanetes(event){
    let trueList = [];
    idxPage = 1;
    if(event == 0 || event.target.value == 0){
        fetch(planetes)
        .then(response => response.json())
        .then(response => {
            listPlanets = response
            console.log(listPlanets);
            initPlanets(listPlanets.results);
            nbResults.textContent = response.count + ' résultat(s)';
    
        });
    }
    else{
        fetch(planetes)
        .then(response => response.json())
        .then(response => {
            listPlanets = response
            trueList = getListFilter(listPlanets, event.target.value);
            initPlanets(trueList);
            nbResults.textContent = trueList.length + ' résultat(s)';
    
        });
    }
    
}

function getListFilter(list, value){
    let trueList = [];
    
        list.results.forEach(laPlanete => {
            if(value == 1){
                if(laPlanete.population >= 0 && laPlanete.population <= 100000){
                    trueList.push(laPlanete);
                }
            }
            else if(value == 2){
                if(laPlanete.population > 100000 && laPlanete.population <= 100000000){
                    trueList.push(laPlanete);
                }
            }
            else if(value == 3){
                if(laPlanete.population > 100000000){
                    trueList.push(laPlanete);
                }
            }
        })
        return trueList;
    }


    function getAllPlanetes(url, all = []) {
        // Effectuer une requête fetch avec l'URL spécifiée
        return fetch(url)
            .then(response => response.json())
            .then(response => {
                // Ajouter les résultats actuels à la liste all
                all.push(...response.results);
    
                // Vérifier s'il y a une page suivante
                if (response.next) {
                    // S'il y a une page suivante, appeler récursivement getAllPlanetes avec l'URL de la page suivante
                    return getAllPlanetes(response.next, all);
                } else {
                    // S'il n'y a pas de page suivante, retourner la liste complète de résultats
                    return all;
                }
            });
    }
    
    // Exemple d'utilisation
    getAllPlanetes('https://swapi.dev/api/planets/')
        .then(planets => {
            // Faire quelque chose avec la liste complète de planètes une fois qu'elle est récupérée
            return planets;
        })
        .catch(error => {
            // Gérer les erreurs de manière appropriée
            console.error('Une erreur s\'est produite :', error);
        });
