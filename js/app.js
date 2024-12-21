//DIGIMON API

//Selección HTML
const formDgm = document.querySelector('.form');
const container = document.querySelector('.main__items');
const nameDgm = document.querySelector('#nombre');
const levelDgm = document.querySelector('#level');

//Eventos
window.addEventListener('load', () => {
    consultarAPI();

    nameDgm.addEventListener('change', () => seleccion());
    levelDgm.addEventListener('change', () => seleccion());

    formDgm.addEventListener('submit', e => filtroApi(e));
    formDgm.addEventListener('reset', e => resetApi(e));
})

//Funciones
const consultarAPI = () => {
    const url = 'https://digimon-api.vercel.app/api/digimon';

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            createCard(datos);
            createSelectName(datos);
            createSelectLevel(datos);
        })
        .catch(error => console.log(error));
}

//--//
const createCard = (datos) => {
    for (let digimon of datos) {
        const card = document.createElement('div');
        card.classList.add('digimon-card');

        const cardInfo = document.createElement('div');
        cardInfo.classList.add('digmon-info');

        const nameInfo = document.createElement('h2');
        nameInfo.classList.add('name-info');
        nameInfo.textContent = digimon.name;

        const levelInfo = document.createElement('p');
        levelInfo.classList.add('level-info');
        levelInfo.textContent = digimon.level;

        const cardImg = document.createElement('img');
        cardImg.classList.add('digimon-img');
        cardImg.src = digimon.img;
        cardImg.alt = `imagen ${digimon.name}`;

        cardInfo.appendChild(nameInfo);
        cardInfo.appendChild(levelInfo);

        card.appendChild(cardInfo);
        card.appendChild(cardImg);

        container.appendChild(card);
    }
}

//--//
const createSelectName = (datos) => {
    for(let digimon of datos) {
        const option = document.createElement('option');
        option.value = digimon.name;
        option.textContent = digimon.name;

        nameDgm.appendChild(option);
    }
}

//--//
const createSelectLevel = (datos) => {
    const levels = [];

    for(let digimon of datos) {
        let levelRegistro = digimon.level;

        if(!levels.includes(levelRegistro)) {
            levels.push(levelRegistro);

            const option = document.createElement('option');
            option.value = digimon.level;
            option.textContent = digimon.level;

            levelDgm.appendChild(option);
        } 
    }
}

//--//
const seleccion = () => {
    if(nameDgm.value) {
        levelDgm.disabled = true;
    }

    if(levelDgm.value) {
        nameDgm.disabled = true;
    }
}

//--//
const filtroApi = (e) => {
    e.preventDefault();

    let busqueda;
    let valor;

    if(nameDgm.value) {
        valor = nameDgm.value;
        busqueda = 'name';
    }

    if(levelDgm.value) {
        valor = levelDgm.value;
        busqueda = 'level';
    }

    if(nameDgm.value === '' && levelDgm.value === '') {
        alerta('Seleccione un Valor');
        return;
    }

    const url = `https://digimon-api.vercel.app/api/digimon/${busqueda}/${valor}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHTML(container);
            
            createCard(datos);
        })
        .catch(error => console.log(error));
}

//--//
const resetApi = (e) => {
    e.preventDefault();

    limpiarHTML(container);

    const url = 'https://digimon-api.vercel.app/api/digimon';

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => createCard(datos))
        .catch(error => console.log(error));
    
    levelDgm.disabled = false;
    levelDgm.value = '';

    nameDgm.disabled = false;
    nameDgm.value = '';
}

//--//
const limpiarHTML = (element) => {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

//--//
const alerta = (msg) => {
    const msgAlerta = document.querySelector('.alert');

    msgAlerta?.remove();

    const parrafo = document.createElement('p');
    parrafo.classList.add('alert');
    parrafo.textContent = msg;

    formDgm.insertBefore(parrafo, formDgm.children[0]);

    setTimeout(() => {
        parrafo.remove();
    }, 2000);
}