export async function getPokemonTypes(): Promise<string[]> {
  const response = await fetch('https://pokeapi.co/api/v2/type');
  const data = await response.json();
  return data.results.map((type: { name: string }) => type.name);
}

export async function getPokemonList(type?: string): Promise<any[]> {
  if (type) {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.json();
    return Promise.all(
      data.pokemon.slice(0, 20).map(async (p: { pokemon: { url: string } }) => {
        const pokemonResponse = await fetch(p.pokemon.url);
        return pokemonResponse.json();
      })
    );
  }

  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
  const data = await response.json();
  return Promise.all(
    data.results.map(async (pokemon: { url: string }) => {
      const pokemonResponse = await fetch(pokemon.url);
      return pokemonResponse.json();
    })
  );
}

export async function getPokemonDetails(name: string): Promise<any> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response.json();
}

export async function getAllPokemon(): Promise<any[]> {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000');
  const data = await response.json();
  return data.results;
}