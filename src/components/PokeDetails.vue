<script setup>
import { computed } from 'vue';
import { usePokedexStore } from '@/stores/pokedex';
import StartButton from './molecules/StarButton.vue';
import Loading from './Loading.vue';

const store = usePokedexStore();
const isPokemonDetailsLoading = computed(() => store.isPokemonDetailsLoading);
const selectedPokemon = computed(() => {
    const pokemon = store.getSelectedPokemon;
    //formattedTypesWithFirstChartInUppercase
    if (pokemon.types !== undefined) {
        pokemon.formattedTypes = pokemon.types.map((type) => {
            let formattedName = type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1);
            return formattedName;
        }).join(', ');
    }
    return store.getSelectedPokemon;
});
const handleStarClick = (enabled) => {
  if(enabled) {
    store.setFavoritePokemon(selectedPokemon.value.name);
  } else {
    store.removeFavoritePokemon(selectedPokemon.value.name);
  }
};

const closeModal = () => {
    const modal = document.getElementById('pokemonModal');
    modal.style.display = 'none';
    store.removeSelection();
}

const handleShareButtonClick = () => {
    const copyToClipboardInformation = `Name: ${selectedPokemon.value.name}, weight: ${selectedPokemon.value.weight}, height: ${selectedPokemon.value.height}, types: ${selectedPokemon.value.formattedTypes}`;
    window.alert('Copied to clipboard!');
    navigator.clipboard.writeText(copyToClipboardInformation);
}

</script>

<template>
    <div class="modal" id="pokemonModal">
        <div v-if="isPokemonDetailsLoading">
            <Loading />
        </div>
        <div v-else class="modal-content">
            <div class=modal-header>
                <div class=modal-header-close @click="closeModal">
                    <img src="./icons/icon_close.svg" alt="iconClose"/>
                </div>
                <img class="header-image" :src="selectedPokemon.sprites !== undefined ? selectedPokemon.sprites.other['official-artwork'].front_shiny : null" alt="Pokeball" />
            </div>
            <div class=modal-body>
                <p class="modal-body-text"><span class=modal-body-description>Name:</span> <span class="modal-body-features">{{ selectedPokemon.name }}</span></p>
                <p class="modal-body-text"><span class=modal-body-description>Weight:</span> <span class="modal-body-features">{{ selectedPokemon.weight }}</span></p>
                <p class="modal-body-text"><span class=modal-body-description>Height:</span> <span class="modal-body-features">{{ selectedPokemon.height }}</span></p>
                <p class="modal-body-text"><span class=modal-body-description>Types:</span> <span class="modal-body-features">{{ selectedPokemon.formattedTypes }}</span></p>
                <div class="modal-body-buttons">
                    <div class="modal-body-button" @click="handleShareButtonClick">
                        <p>Share to my friends</p> 
                    </div>
                    <div class="modal-body-star-button">
                        <StartButton :value="selectedPokemon.isFavorite" @click="handleStarClick"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
}

.modal-content {
    margin: 153px auto;
    border: 1px solid #888;
    width: 315px;
    height: 550px;
    background-color: white;
    border-radius: 5px;
    @media (min-width: 1024px) {
        margin: 97px auto;
        width: 570px;
    }
}

.modal-header {
    height: 220px;
    padding: 2px 16px;
    background-image: url('../assets/poke_details_background.svg');
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.modal-header-close {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
    margin-right: 15px;
}
.header-image {
    width: 180px;
    height: 180px;
}
.modal-body {
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 30px;
    font-family: 'Lato';
    font-size: 18px;
    color: #5E5E5E;
}
.modal-body-text {
    width: 100%;
    text-align: start;
    border-bottom: 1px solid #E5E5E5;
    padding: 20px 0 10px 0;
    font-weight: 500;
}
.modal-body-description {
    font-weight: 700;
}
.modal-body-features {
    display: inline-block;
}
.modal-body-features:first-letter {
    text-transform: uppercase;
}
.modal-body-buttons {
    background-color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    width: 100%;
    height: 44px;
}
.modal-body-button {
    background-color: red;
    color: white;
    font-size: 18px;
    font-family: 'Lato';
    font-weight: 700;
    border: none;
    border-radius: 60px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 195px;
    height: 44px;
}
</style>
