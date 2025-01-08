export async function getPokemons() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon');
  const data = await response.json();
  return data.results;
}

export async function getPokemonDetails(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    return data.results;
}