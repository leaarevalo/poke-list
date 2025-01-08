<script setup>
import StartButton from './molecules/StarButton.vue';

const emit = defineEmits(['click', 'itemClick']);
defineProps(['pokemonName']);

const handleClickStarButton = (isButtonEnabled) => {
    console.log("star button clicked");
    emit('click', isButtonEnabled);
}

const handleClickItem = () => {
    console.log("item button clicked");
    emit('itemClick');
}
</script>
<template>
    <div class="pokelist">
        <div class="pokelist-item-container" @click.self="handleClickItem">
            <p class="pokelist-item-text">{{ pokemonName }}</p>
            <StartButton @click="handleClickStarButton"/>
        </div>
    </div>
</template>

<style>
.pokelist-item-container {
    width: 315px;
    height: 60px;
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.pokelist-item-text {
    font-size: 22px;
    color: #353535;
}
</style>