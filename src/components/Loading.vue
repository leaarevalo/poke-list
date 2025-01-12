<template>
    <div class="loading">
        <div class="loading-content">
            <img class="loading-image" src="./icons/pokedex_loading.svg" alt="loading"/>
        </div>
    </div>
</template>

<style scoped>
.loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background-color: #F9F9F9;
    place-items: center;
}
.loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.loading-image {
    width: 106px;
    height: 106px;
    animation: grow 1s infinite;
}

@keyframes grow {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
}
</style>