<script setup>
import PokeListItem from '@/components/PokeListItem.vue';
import { onMounted, ref, watch } from 'vue';
import { usePokedexStore } from '@/stores/pokedex';
const store = usePokedexStore();
const pokemons = ref([]);
const pokemonsFiltered = ref([]);
const search = ref('');

onMounted(async () => {
  await store.fetchPokemons();
  pokemons.value = store.pokemons;
});
watch(search, (value) => {
  if(value === '') {
    pokemonsFiltered.value = [];
    return;
  } else {
    pokemonsFiltered.value = pokemons.value.filter((pokemon) => pokemon.name.includes(value));
  }
});
</script>

<template>
  <div class="pokelist">
    <input class="pokelist-input" type="text" v-model="search" placeholder="Search" />
    <div v-if="pokemonsFiltered.length > 0">
      <div v-for="pokemon in pokemonsFiltered" :key="pokemon.name">
        <PokeListItem :pokemonName="pokemon.name" />
      </div>
    </div>
    <div v-else>
      <div v-for="pokemon in pokemons" :key="pokemon.name">
        <PokeListItem :pokemonName="pokemon.name" />
      </div>
    </div>
  </div>
</template>

<style>
.pokelist-input {
  width: 315px;
  height: 50px;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.04);
  background: url('../components/icons/search.svg') no-repeat 18px 18px;
  text-indent: 38px;
}
</style>
