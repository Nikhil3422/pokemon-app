import { getPokemonList, getPokemonTypes } from "@/lib/api";
import { SearchForm } from "@/components/search-form";
// import { PokemonGrid } from "@/components/pokemon-grid";

export default async function Home() {
  const [types, pokemons] = await Promise.all([
    getPokemonTypes(),
    getPokemonList(),
  ]);

  return (
    <div className="min-h-screen p-4 md:p-6 ">
      <div className="max-w-7xl mx-auto bg-gray-100 pt-8">
        <h1 className="relative text-4xl font-bold text-center  mb-8 ">
          Pokémon
        </h1>

        <SearchForm types={types} pokemons={pokemons} />
      </div>
    </div>
  );
}
