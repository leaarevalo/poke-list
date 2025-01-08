import { defineStore } from 'pinia'

export const usePokedexStore = defineStore('pokedex', {
  state: () => ({
    pokemons: [],
    isLoading: false
  }),
  actions: {
    async fetchPokemons() {
      this.isLoading = true
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
      const data = await response.json()
      console.log("data", data);
      this.pokemons = data.results
      this.isLoading = false
    }
  },
  getters: {

  }
})
