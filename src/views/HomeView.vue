<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <main>
    <div class="homeview">
      <img class="homeview-image" src="../components/icons/pikachu.svg" alt="Pikachu" />
      <h1 class="homeview-title">Welcome to Pokedex</h1>
      <p class="homeview-subtitle">The digital encyclopedia created by professor Oak is an invaluable tool to Trainers in the Pokémon world</p>
        <RouterLink to="/poke-list" class="homeview-link">
          <button class="homeview-button">Get started</button>
        </RouterLink>
    </div>
  </main>
</template>

<style>
.homeview {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  text-align: center;
}
.homeview-image {
  display: relative;
  width: 400px;
}
.homeview-title {
  font-size: 26px;
  line-height: 31.2px;
  font-family: 'Lato';
  font-weight: 700;
  margin-bottom: 30px;
}
.homeview-subtitle {
  font-size: 18px;
  line-height: 27px;
  font-family: 'Lato';
  font-weight: 500;
  margin-bottom: 50px;
  @media (min-width: 1024px) {
    width: 570px;
  }
}
.homeview-button {
  padding: 10px 20px;
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
