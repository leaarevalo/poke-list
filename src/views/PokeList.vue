<script setup>
import PokeListItem from '@/components/PokeListItem.vue';
import PokeDetails from '@/components/PokeDetails.vue';
import Loading from '@/components/Loading.vue';
import { onMounted, ref, watch, computed } from 'vue';
import { usePokedexStore } from '@/stores/pokedex';
import { storeToRefs } from 'pinia';
const store = usePokedexStore();
const pokemons = ref([]);
const pokemonsFavorites = computed(() => store.getFavoritesPokemons);
const pokemonsFiltered = ref([]);
const search = ref('');
const isLoadingValue = ref(true);
const isAllActive = ref(true);
const { isLoading } = storeToRefs(store);

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
  if (pokemonsFavorites.value.length === 0) {
    return;
  }
  pokemons.value = pokemonsFavorites.value;
  isAllActive.value = false;
};

const handleStarClick = ({name, enabled}) => {
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
watch(isLoading, (value) => {
  isLoadingValue.value = value;
}, { immediate: true });
</script>

<template>
  <div class="pokelist" :class="{'pokelist--loading': isLoadingValue}">
    <div class="pokelist-loading" v-if="isLoadingValue">
      <Loading />
    </div>
    <div v-else class="pokelist-list">
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
</div>
</template>

<style scoped>
.pokelist {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  text-align: center;
  place-items: center;
  height: 100%;
  width: 100%;
  background-color: #F9F9F9;
}
.pokelist-loading {
  height: 100vh;
}
.pokelist-list {
  height: 100vh;
}
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
  @media (min-width: 1024px) {
    width: 570px;
    top: 0px;
  }
}
.footer-list {
  width: 100%;
  height: 80px;
  background-color: white;
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: center;
  bottom: -3px;
  left: 0;
  right: 0;
  padding: 18px 30px;
  @media (min-width: 1024px) {
    justify-content: center;
  }
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
  margin-left: 15px;
  cursor: pointer;
  @media (min-width: 1024px) {
    width: 275px;
    margin-left: 20px;
  }
  
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
