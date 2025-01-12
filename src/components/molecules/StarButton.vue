<script setup>
import { ref, watch } from 'vue';
const props = defineProps(['value']);
const emit = defineEmits(['click']);

const isButtonEnabled = ref(false);
const onButtonClick = () => {
    isButtonEnabled.value = !isButtonEnabled.value;
    emit('click', isButtonEnabled.value);
}
watch(() => props.value, (newValue) => {
    isButtonEnabled.value = newValue;
});
</script>

<template>
    <button @click="onButtonClick" class="star-button">
        <img v-if="!props.value" class="star-image" src="../icons/StartDisabled.svg" alt="">
        <img v-else class="star-image" src="../icons/StarActive.svg" alt="">
    </button>
</template>

<style>
.star-button {
    background-color: transparent;
    border: none;
}
</style>