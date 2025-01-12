<script setup>
import StartButton from './molecules/StarButton.vue';

const emit = defineEmits(['click', 'itemClick']);
const props = defineProps(['pokemonName', 'isFavorite']);

const handleClickStarButton = (isButtonEnabled) => {
    emit('starClick', {name: props.pokemonName, enabled: isButtonEnabled});
}

const handleClickItem = () => {
    emit('itemClick', props.pokemonName);
}
</script>
<template>
    <div class="pokelist">
        <div class="pokelist-item-container" @click.self.stop="handleClickItem">
            <p class="pokelist-item-text" @click.self.stop="handleClickItem">{{ pokemonName }}</p>
            <StartButton :value="isFavorite" @click="handleClickStarButton"/>
        </div>
    </div>
</template>

<style>
.pokelist {
    padding-bottom: 10px;
}
.pokelist-item-container {
    width: 315px;
    height: 60px;
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    @media (min-width: 1024px) {
        width: 570px;
    }
}
.pokelist-item-text {
    font-size: 22px;
    color: #353535;
    padding: 17px 0 17px 20px;
}
.pokelist-item-text::first-letter {
    text-transform: uppercase;
}
</style>