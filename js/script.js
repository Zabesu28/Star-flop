let pers = document.querySelector('#personnes');
let vehi = document.querySelector('#vehicules');
let plan = document.querySelector('#planetes');


let personnes = 'https://swapi.dev/api/people';
let planetes = 'https://swapi.dev/api/planets';
let vehicules = 'https://swapi.dev/api/starships';

function initStat(){
  fetch(personnes)
  .then(response => response.json())
  .then(response => {
    pers.textContent = response.count;
  });

fetch(planetes)
  .then(response => response.json())
  .then(response => {
    plan.textContent = response.count;
  });

fetch(vehicules)
  .then(response => response.json())
  .then(response => {
    vehi.textContent = response.count;
  });
}

initStat();