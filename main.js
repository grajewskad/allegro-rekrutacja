let pokemonsArray = [];
let pokemonsDisplays = [];
let pokemonType = [];
let pokemonColor = [];
let allTypes = [];
let pokedivs = [];
let pokeobj;
darkcolors = ["#BF8275", "#8C030E", "#025A76", "#8C262E", "#A6633C", "#94877F", "#8C644D", "#C9C9C9", "#4E6478", "#D90000", "#27738D", "#6F8B00", "#F4B807", "#D97B98", "#A7BDD9", "#8C1C03", "#351F4F", "#403C3B"];
lightcolors = ["#F2B29B", "#D91A2A", "#04D2E5", "#9F6D79", "#D99559", "#D0C2B5", "#D9B282", "#FFFFFF", "#80A4C4", "#FF8C00", "#98CEF4", "#93BA06", "#F4CC07", "#F1A3BE", "#D5E2F2", "#F24405", "#5C457F", "#BF8275"];
pokecolorsArray = ["normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire", "water", "grass", "electric", "psychic", "ice", "dragon", "fairy", "dark"];



function Pokemon(name, type, id, photo) {
    this.name = name;
    this.type = type;
    this.id = id;
    this.photo = photo;
}

function Color(name, colorlight, colordark) {
    this.name = name;
    this.colorlight = colorlight;
    this.colordark = colordark;
}

function Types(name, pokemons) {
    this.name = name;
    this.pokemons = pokemons;

}

let pokeball = document.getElementsByClassName("pokeball")[0];
function getPokemons(url) {
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            for (let i = 0; i < data.results.length; i++) {
                fetch(data.results[i].url)
                    .then((respn) => respn.json())
                    .then(function (pokemonItem) {
                        for (let j = 0; j < pokemonItem.types.length; j++) {
                            pokemonType.push(pokemonItem.types[j].type.name);

                        }
                        pokemonsArray.push(new Pokemon(pokemonItem.name, pokemonType, pokemonItem.id, pokemonItem.sprites.front_default));
                        pokemonType = [];

                    })
            }
            if (data.next != null) {
                getPokemons(data.next);
            }
            else {

                pokemonsArray.sort(function (a, b) { //sort with id
                    return a.id - b.id;
                });
                for (let i = 0; i < 72; i++) { //add divs to container
                    createDiv(['pokecard'], "container", 0, i);
                }

                let pagination = document.getElementsByClassName("pagination")[0];
                pagination.innerHTML = " ";
                for (let i = 1; i <= pokemonsArray.length / 72; i++) { //add pagination
                    let newLi = document.createElement("li");
                    newLi.classList.add("page-item");
                    pagination.appendChild(newLi);
                    let newA = document.createElement("a");
                    newA.classList.add("page-link");
                    newLi.appendChild(newA);
                    newA.innerHTML += i;
                    newLi.onclick = function () {
                        document.location.hash = i;
                        let container = document.getElementsByClassName("container")[0];
                        container.innerHTML = " ";
                        for (let j = (i - 1) * 72; j < (i * 72); j++) {
                            createDiv(['pokecard'], "container", 0, j);
                        }
                    }
                }

                pokemonsArray.forEach((element) => {
                    element.type.forEach((elementtype) => {
                        pokeobj = allTypes.find(o => o.name === elementtype);
                        pokeobj.pokemons.push(element.id);

                    })


                })
                pokemonsArray.forEach(element => pokedivs.push(element.id));
                document.getElementsByClassName("pokeball")[0].style.display = "none";
            }
        })


}


function createDiv(classnamediv, classnameparent, classcounter, iteration) { //create div card pokemon
    let newDiv = document.createElement('div');
    classnamediv.forEach(element => newDiv.classList.add(element));
    newDiv.style.backgroundColor = pokemonColor.find(element => element.name == pokemonsArray[iteration].type[0]).colorlight;
    let nrBar = document.createElement('div');
    nrBar.classList.add("nrbar");
    nrBar.innerHTML = "#" + pokemonsArray[iteration].id;
    let newImage = document.createElement('img');
    newImage.setAttribute("src", pokemonsArray[iteration].photo);
    newImage.classList.add("pokeimage");
    nrBar.style.backgroundColor = pokemonColor.find(element => element.name == pokemonsArray[iteration].type[0]).colordark;
    newDiv.appendChild(nrBar);
    newDiv.appendChild(newImage);
    newDiv.innerHTML += "<br/>" + "<b>" + pokemonsArray[iteration].name + "</b><br/>";
    pokemonsArray[iteration].type.forEach(element => newDiv.innerHTML += element + " ");
    document.getElementsByClassName(classnameparent)[classcounter].appendChild(newDiv);
}

function ifchecked(item) {

    if (item.checked) {
        pokedivs = [];
        document.getElementsByClassName("container")[0].innerHTML = " ";
        pokeobjdisp = allTypes.find(o => o.name === item.id);
        pokemonsDisplays.push(pokeobjdisp.pokemons);
        pokemonsDisplays.forEach(element => element.forEach(elem => { if (!pokedivs.includes(elem)) { pokedivs.push(elem); } }));
        pokedivs.sort(function (a, b) { //sort with id
            return a - b;
        });
    for (let i = 0; i < 72; i++) { //add divs to container
            if (pokedivs.length != 0) {
                createDiv(['pokecard'], "container", 0, pokemonsArray.map(function (e) { return e.id; }).indexOf(pokedivs[i]));
            }
        }
        let pagination = document.getElementsByClassName("pagination")[0];
        pagination.innerHTML = " ";
        for (let i = 1; i <= pokedivs.length / 72; i++) { //add pagination
            let newLi = document.createElement("li");
            newLi.classList.add("page-item");
            pagination.appendChild(newLi);
            let newA = document.createElement("a");
            newA.classList.add("page-link");
            newLi.appendChild(newA);
            newA.innerHTML += i;
            newLi.onclick = function () {
                document.location.hash = i;
                let container = document.getElementsByClassName("container")[0];
                container.innerHTML = " ";
                for (let j = (i - 1) * 72; j < (i * 72); j++) {
                    if (pokedivs.length != 0) {
                        createDiv(['pokecard'], "container", 0, pokemonsArray.map(function (e) { return e.id; }).indexOf(pokedivs[j]));
                    }
                }
            }
        }
    }
    else {
        pokedivs = [];
        document.getElementsByClassName("container")[0].innerHTML = " ";
        pokeobjdisp = allTypes.find(o => o.name === item.id);
        pokemonsDisplays = pokemonsDisplays.filter(element => element !== pokeobjdisp.pokemons);
        pokemonsDisplays.forEach(element => element.forEach(elem => { if (!pokedivs.includes(elem)) { pokedivs.push(elem); } }));
        pokedivs.sort(function (a, b) { //sort with id
            return a - b;
        });
        for (let i = 0; i < 72; i++) { //add divs to container
            if (pokedivs.length != 0) {
                createDiv(['pokecard'], "container", 0, pokemonsArray.map(function (e) { return e.id; }).indexOf(pokedivs[i]));
            }
        }
        let pagination = document.getElementsByClassName("pagination")[0];
        pagination.innerHTML = " ";
        for (let i = 1; i <= pokedivs.length / 72; i++) { //add pagination
            let newLi = document.createElement("li");
            newLi.classList.add("page-item");
            pagination.appendChild(newLi);
            let newA = document.createElement("a");
            newA.classList.add("page-link");
            newLi.appendChild(newA);
            newA.innerHTML += i;
            newLi.onclick = function () {
                document.location.hash = i;
                let container = document.getElementsByClassName("container")[0];
                container.innerHTML = " ";
                for (let j = (i - 1) * 72; j < (i * 72); j++) {
                    if (pokedivs.length != 0) {
                        createDiv(['pokecard'], "container", 0, pokemonsArray.map(function (e) { return e.id; }).indexOf(pokedivs[j]));
                    }
                }
            }
        }
    }
}




const url = "https://pokeapi.co/api/v2/pokemon";
getPokemons(url);

for (var i = 0; i < pokecolorsArray.length; i++) {  //create data with background colors
    pokemonColor.push(new Color(pokecolorsArray[i], lightcolors[i], darkcolors[i]));
}
fetch("https://pokeapi.co/api/v2/type")
    .then((resp) => resp.json())
    .then(function (types) {
        for (let i = 0; i < types.results.length; i++) {
            allTypes.push(new Types(types.results[i].name, []));
        }
        let labels = document.getElementsByClassName("labels")[0];
        allTypes.forEach(element => labels.innerHTML += '<div class="custom-control custom-checkbox"><input type="checkbox" class="custom-control-input" id=' + element.name + ' onclick="ifchecked(this)"><label class="custom-control-label" for=' + element.name + '>' + element.name + '</label></div>');


    })






