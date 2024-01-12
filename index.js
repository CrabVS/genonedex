const container = document.querySelector('.container');
const pokemon_count = 151;
const colors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE'
}
const opacity = '3a';

const main_types = Object.keys(colors);

const fetchPokemon = async function fetchAllPokemon() {
    for(let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i);
    }
}

const getPokemon = async function getPokemonById(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    createPokemonCard(data);
}

const createPokemonCard = function createPokemonCard(pokemon) {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');
    
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');

    const types = pokemon.types.map((type) => type.type.name);

    const main_type = main_types.find(type => types.indexOf(type) > -1)
    const color = colors[main_type];
    pokemonEl.style.backgroundColor = color + opacity;

    types.forEach((type, index) => {
        types[index] = type[0].toUpperCase() + type.slice(1);
    });
    const type_display = types.join(' / ');

    const pokemonInnerHTML = `
    <div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="bulbasaur img">
    </div>
    <div class="details">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">${type_display}</small>
    </div>`

    pokemonEl.innerHTML = pokemonInnerHTML;

    container.appendChild(pokemonEl);
}

fetchPokemon();