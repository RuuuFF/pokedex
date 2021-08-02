const Pokemon = {
  poke_container: document.getElementById('poke-container'),
  pokemon_count: 200,

  colors: { fire: '#fddfdf', grass: '#defde0', electric: '#fcf7de', water: '#def3fd', ground: '#f4e7da', rock: '#d5d5d4', fairy: '#fceaff', poison: '#98d7a5', bug: '#f8d5a3', dragon: '#97b3e6', psychic: '#eaeda1', flying: '#f5f5f5', fighting: '#e6e0d4', normal: '#f5f5f' },

  main_types: null,

  formatName: name => {
    return name[0].toUpperCase() + name.slice(1)
  },

  createPokemonCard: pokemon => {
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')
  
    const name = Pokemon.formatName(pokemon.name)
    const id = pokemon.id.toString().padStart(3, '0')
    const poke_types = pokemon.types.map(type => type.type.name)
    const type = Pokemon.main_types.find(type => poke_types.indexOf(type) > -1)
    
    const color = Pokemon.colors[type]
    pokemonEl.style.backgroundColor = color
    
    const pokemonInnerHTML = `
      <div class="img-container">
        <img src="https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png" alt="${name}">
      </div>
      <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${Pokemon.formatName(type)}</span></small>
      </div>
    `
  
    pokemonEl.innerHTML = pokemonInnerHTML
    Pokemon.poke_container.appendChild(pokemonEl)
  },

  getPokemon: async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
  
    Pokemon.createPokemonCard(data)
  },

  fetchPokemons: async () => {
    for (let i = 1; i <= Pokemon.pokemon_count; i++) {
      await Pokemon.getPokemon(i)
    }
  },

  start() {
    Pokemon.main_types = Object.keys(Pokemon.colors)
    Pokemon.fetchPokemons()
  }
}

Pokemon.start()