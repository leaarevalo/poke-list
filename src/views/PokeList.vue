<script setup>
import PokeListItem from '@/components/PokeListItem.vue';
import PokeDetails from '@/components/PokeDetails.vue';
import { onMounted, ref, watch, computed } from 'vue';
import { usePokedexStore } from '@/stores/pokedex';
const store = usePokedexStore();
const pokemons = ref([]);
const pokemonsFavorites = computed(() => store.getFavoritesPokemons);
const pokemonsFiltered = ref([]);
const search = ref('');
const isAllActive = ref(true);

const getPokemonDetails = (pokemonName) => {
  store.fetchPokemonDetails(pokemonName);
  openModal();
};

const openModal = () => {
  const modal = document.getElementById('pokemonModal');
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
      store.removeSelection();
    }
  };
  modal.style.display = 'block';
};

const handleIsAllClickButton = () => {
  pokemons.value = store.pokemons;
  isAllActive.value = true;
};

const handleIsFavoritesClickButton = () => {
  pokemons.value = pokemonsFavorites.value;
  isAllActive.value = false;
};

const handleStarClick = ({name, enabled}) => {
  console.table({name, enabled});
  if(enabled) {
    store.setFavoritePokemon(name);
  } else {
    store.removeFavoritePokemon(name);
  }
};

onMounted(async () => {
  await store.fetchPokemons();
  pokemons.value = store.pokemons;
});
watch(search, (value) => {
  if(value === '') {
    pokemonsFiltered.value = [];
    return;
  } else {
    pokemonsFiltered.value = pokemons.value.filter((pokemon) => pokemon.name.includes(value.toLowerCase()));
  }
});
</script>

<template>
  <div class="pokelist">
    <input class="pokelist-input" type="text" v-model="search" placeholder="Search" />
    <PokeDetails />
    <div v-if="pokemonsFiltered.length > 0">
      <div v-for="pokemon in pokemonsFiltered" :key="pokemon.name">
        <PokeListItem ref="pokeList" :pokemonName="pokemon.name" :isFavorite="pokemon.isFavorite" @itemClick="getPokemonDetails" @starClick="handleStarClick" />
      </div>
    </div>
    <div v-else-if="search !== '' && pokemonsFiltered.length === 0">
      <div class="pokelist-not-found">
        <p class="not-found-title">Uh - Oh!</p>
        <p class="not-found-subtitle">You look lost on your journey!</p>
        <RouterLink to="/" class="homeview-link">
          <button class="pokelist-button">Get started</button>
        </RouterLink>
      </div>

    </div>
    <div v-else>
      <div v-for="pokemon in pokemons" :key="pokemon.name">
        <PokeListItem ref="pokeList" :pokemonName="pokemon.name" :isFavorite="pokemon.isFavorite" @itemClick="getPokemonDetails" @starClick="handleStarClick"/>
      </div>
    </div>
    <div class="footer-list">
      <div class="footer-button" :class="{ 'footer-button--disabled': !isAllActive }" @click="handleIsAllClickButton">
        <img src="../components/icons/list_icon.svg" alt="">
        <p>All</p>
      </div>
      <div class="footer-button" :class="{ 'footer-button--disabled': isAllActive }" @click="handleIsFavoritesClickButton">
        <img src="../components/icons/star_icon.svg" alt="">
        <p>Favorites</p>
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
  background-color: white;
  margin-bottom: 40px;
}
.footer-list {
  width: 100%;
  height: 80px;
  background-color: white;
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  bottom: -3px;
  left: 0;
  right: 0;
  padding: 18px 30px;
}
.footer-button {
  background-color: red;
  width: 150px;
  height: 44px;
  border-radius: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  font-family: 'Lato';
  font-weight: 700;
  
  img {
    margin-right: 10px;
    width: 22px;
    height: 22px;
  }
}
.footer-button--disabled {
    background-color: #BFBFBF !important;
}
.pokelist-not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.not-found-title {
  font-family: 'Lato';
  font-size: 36px;
  font-weight: 700;
  color: #353535;
}
.not-found-subtitle {
  font-family: 'Lato';
  font-size: 20px;
  font-weight: 500;
  color: #5E5E5E
}
.pokelist-button {
  padding: 10px 20px;
  margin-top: 25px;
  background-color: #F22539;
  color: white;
  font-size: 16px;
  font-family: 'Lato';
  font-weight: 700;
  border: none;
  border-radius: 60px;
  cursor: pointer;
}
</style>
