const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    /*fetch(url + i): La función fetch se utiliza para realizar peticiones HTTP.
 Aquí, se está utilizando para hacer una solicitud a la API de Pokémon para obtener información sobre un Pokémon específico.*/ 
    fetch(URL + i)
    /*url + i se utiliza para construir la URL completa para cada Pokémon en el bucle.
*/
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}/*
.then((responsive) => responsive.json()): Después de realizar la solicitud con fetch, este bloque then se encarga de procesar la respuesta. responsive.json() 
se utiliza para convertir la respuesta de la solicitud a formato JSON.

.then((data) => console.log(data));: Finalmente, este bloque then toma los datos (ya convertidos a formato JSON) y los imprime en la consola del navegador usando console.log(data).*/


function mostrarPokemon(poke) {

    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');// JOIN junta todos los array y los transforma en string



    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }


    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
    <div class="fondo">
    <div class="pokemon-imagen">
    <img src="${poke.sprites.other['official-artwork'].front_default} "
        alt="${poke.name}">
    </div>
    </div>
    <div class="pokemon-info">
    <div class="nombre-contenedor">
    <p class="pokemon-id">${poke.id}</p>
    <h2 class="pokemon-nombre">${poke.name}</h2>
    </div>
    <div class="pokemon-tipos">
    ${tipos}
    </div>
    <div class="pokemon-stats">
    <p class="altura">${poke.height}m</p>
    <p class="peso">${poke.weight}Kg</p>
    </div>
    </div>
    
    `;
    listaPokemon.append(div);
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if(botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }

            })
    }
}))