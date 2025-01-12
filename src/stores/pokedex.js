import { defineStore } from 'pinia'

export const usePokedexStore = defineStore('pokedex', {
  state: () => ({
    pokemons: [],
    favoritesPokemons: [],
    pokemonDetails: {},
    isLoading: true,
    isPokeDetaisLoading: false,
  }),
  actions: {
    async fetchPokemons() {
      this.isLoading = true
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
      const data = await response.json()
      this.pokemons = data.results.map(pokemon => ({
        name: pokemon.name,
        url: pokemon.url,
        isFavorite: false,
      }))
      this.isLoading = false
    },
    async fetchPokemonDetails(name) {
      this.isPokeDetaisLoading = true
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      const data = await response.json()
      const isFavorite = this.favoritesPokemons.some(poke => poke.name === name);
      this.pokemonDetails = data;
      this.pokemonDetails.isFavorite = isFavorite;
      this.isPokeDetaisLoading = false
    },
    removeSelection() {
      this.pokemonDetails = {};
    },
    setFavoritePokemon(pokemonName) {
      const pokemon = this.pokemons.find(poke => poke.name === pokemonName);
      pokemon.isFavorite = true;
      if (this.pokemonDetails.name !== undefined && this.pokemonDetails.name === pokemonName) {
        this.pokemonDetails.isFavorite = true;
      }
      this.favoritesPokemons.push(pokemon);
    },
    removeFavoritePokemon(pokemonName) {
      const pokemon = this.pokemons.find(poke => poke.name === pokemonName);
      pokemon.isFavorite = false;
      if (this.pokemonDetails.name !== undefined && this.pokemonDetails.name === pokemonName) {
        this.pokemonDetails.isFavorite = false;
      }
      const removeFavoritePokemon = this.favoritesPokemons.filter(poke => poke.name !== pokemonName);
      this.favoritesPokemons = removeFavoritePokemon;
    }
  },
  getters: {
    getSelectedPokemon: (state) => state.pokemonDetails,
    getFavoritesPokemons: (state) => state.favoritesPokemons,
  }
})
