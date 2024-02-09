const nbResults = document.querySelector('#nbResults');
const planetes = 'https://swapi.dev/api/planets?fields=results';

const tableau = document.querySelector('#tableau');
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
const page = document.querySelector('#page');

const select = document.querySelector('#select-planete');

let listPlanets;
let allPlanets;
let idxPage;

let list1;
let list2;
let list3;

initListesFilter();

getPlanetes(select.value);

async function initListesFilter(){
listPlanets = await getDataByUrl(planetes)
list1 = await getPlanetesOneList(planetes, list1, 1);
list2 = await getPlanetesOneList(planetes, list2, 2);
list3 = await getPlanetesOneList(planetes, list3, 3);
}

select.addEventListener('change', getPlanetes);

// Page précédente

previous.addEventListener('click', goToPreviousPage)

async function goToPreviousPage(){
    if(!listPlanets.previous){
        alert("Vous êtes à la première page")
    }
    else{
        listPlanets = await getDataByUrl(listPlanets.previous)
        idxPage--;
        initPlanets(listPlanets.results);
    }
}

// Page suivante

next.addEventListener('click', goToNextPage);

async function goToNextPage(){
    if(!listPlanets.next){
        alert("Vous êtes à la dernière page")
    }
    else{
        listPlanets = await getDataByUrl(listPlanets.next)
        idxPage++;
        initPlanets(listPlanets.results);
    }
}



async function getDataByUrl(url){
    const response = await fetch(url);
    return await response.json();
}

function initPlanets(listPlanets){

    initTitleTableau();
    
    listPlanets.forEach(planete => {

        addDiv(planete);

        page.textContent = "Page "+ idxPage;

        createTableauData(planete);
        
    });
}

function createTableauData(planete){
    Array.from(tableau.children).forEach(function(row) {
        row.addEventListener('click', function () {

            removeClassSelectedAllChildren(tableau);

            row.classList.add("selected");
            
            if(planete.name == row.children[0].textContent){           
                afficheSelectedPlanet();
                initDataSelectedPlanet(planete);
            }
        });
    });
}

function removeClassSelectedAllChildren(parent){
    Array.from(parent.children).forEach(function(child) {
        child.classList.remove("selected");
    });
}

function addDiv(planete){
    const div = document.createElement("div");
    div.classList.add("flex-column");
    div.innerHTML = `<h4>${planete.name}</h4><h4>${planete.terrain}</h4>`;
    
    tableau.appendChild(div);
}

function afficheSelectedPlanet(){
    const info = document.querySelector('#info');
    const pasInfo = document.querySelector('#pas-info');

    info.classList.remove("none");
    pasInfo.classList.add("none");
}

function initDataSelectedPlanet(planete){

    const population = document.querySelector('#population-planete');
    population.innerHTML = "<span>Population : </span>" + planete.population;

    const elements = {
        '#titre-planete': planete.name,
        '#diametre': planete.diameter,
        '#climat': planete.climate,
        '#gravite': planete.gravity,
        '#terrain': planete.terrain
    };

    for (const selector in elements) {
        const element = document.querySelector(selector);
        if (element) {
            element.textContent = elements[selector];
        }
    }
}

function initTitleTableau(){
    tableau.innerHTML = "";

    const div = document.createElement("div");
    div.classList.add("flex-column");
    div.innerHTML = `<h3>Nom</h3><h3>Terrain</h3>`;
    
    tableau.appendChild(div);
}

async function getPlanetes(event){
    idxPage = 1;
    if(event == 0 || event.target.value == 0){
        if(!listPlanets){
            listPlanets = await getDataByUrl(planetes)
        }
        
        initPlanets(listPlanets.results);
        nbResults.textContent = listPlanets.count + ' résultat(s)'; 
    }
    else{
        if(event.target.value == 1){
           initLaPlanete(list1);
        }
        else if(event.target.value == 2){
            initLaPlanete(list2);
         }
         else if(event.target.value == 3){
            initLaPlanete(list3);
         }   
    } 
}

function initLaPlanete(list){
    initPlanets(list);
    nbResults.textContent = list.length + ' résultat(s)';
}

function getListFilter(list, value){
    return list.filter(laPlanete => {
        if (value == 1) {
            return laPlanete.population >= 0 && laPlanete.population <= 100000;
        } else if (value == 2) {
            return laPlanete.population > 100000 && laPlanete.population <= 100000000;
        } else if (value == 3) {
            return laPlanete.population > 100000000;
        }
    });
}

async function getPlanetesOneList(url, all = [], value) {
    const data = await getDataByUrl(url)

    all.push(...data.results);

    // Vérifier s'il y a une page suivante
    if (data.next) {
        // S'il y a une page suivante, appeler récursivement getAllPlanetes avec l'URL de la page suivante
        return getPlanetesOneList(data.next, all, value);
    } else {
        // S'il n'y a pas de page suivante, retourner la liste complète de résultats
        all = await getListFilter(all, value);
        return all;
        
    }
}
