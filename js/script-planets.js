let nbResults = document.querySelector('#nbResults');
let planetes = 'https://swapi.dev/api/planets';

let tableau = document.querySelector('#tableau');
let previous = document.querySelector('#previous');
let next = document.querySelector('#next');
let page = document.querySelector('#page');

let listPlanets;
let idxPage;

fetch(planetes)
  .then(response => response.json())
  .then(response => {
    listPlanets = response
    idxPage = 1;
    initPlanets(listPlanets.results);
    nbResults.textContent = response.count + ' résultat(s)';
    
});

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
    console.log(idxPage)
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


