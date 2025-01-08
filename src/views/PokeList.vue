<script setup>
import PokeListItem from '@/components/PokeListItem.vue';
import { onMounted, ref } from 'vue';
import { usePokedexStore } from '@/stores/pokedex';
const store = usePokedexStore();
const pokemons = ref([]);
onMounted(async () => {
  console.log('PokeList component mounted');
  await store.fetchPokemons();
  pokemons.value = store.pokemons;
});
</script>

<template>
  <div class="pokelist">
    <input class="pokelist-input" type="text">
    <div v-for="pokemon in pokemons" :key="pokemon.id">
      <PokeListItem :pokemonName="pokemon.name" />
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
