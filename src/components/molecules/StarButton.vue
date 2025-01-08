<script setup>
import { ref } from 'vue';
const emit = defineEmits(['click']);

const isButtonEnabled = ref(false);
const onButtonClick = () => {
    isButtonEnabled.value= !isButtonEnabled.value;
    emit('click', isButtonEnabled.value);
}
</script>

<template>
    <button @click="onButtonClick" class="star-button">
        <img v-if="!isButtonEnabled" class="star-image" src="../icons/StartDisabled.svg" alt="">
        <img v-else class="star-image" src="../icons/StarActive.svg" alt="">
    </button>
</template>

<style>
.star-button {
    background-color: transparent;
    border: none;
}
</style>