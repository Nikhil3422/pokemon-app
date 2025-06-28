import { getPokemonDetails, getAllPokemon } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
export async function generateStaticParams() {
  const pokemon = await getAllPokemon();
  return pokemon.slice(0, 151).map((pokemon: { name: string }) => ({
    name: pokemon.name,
  }));
}

export default async function PokemonDetails({
  params,
}: {
  params: { name: string };
}) {
  const pokemon = await getPokemonDetails(params.name);

  return (
    <div className="min-h-scree p-4 md:p-8">
      <div className="max-w-4xl  mx-auto">
        <div className={cn("")}>
          <Link href="/">
            <span className="text-green-500 hover:text-green-600">
              &lt; Back
            </span>
          </Link>
        </div>

        <Card className="mt-8">
          <div className="grid md:grid-cols-2 gap-8 p-6">
            <div className="flex items-center justify-center">
              <img
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
                className="w-full max-w-md"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold capitalize mb-4">
                  {pokemon.name}
                </h1>
                <div className="flex gap-2">
                  {pokemon.types.map((type: any) => (
                    <Badge
                      key={type.type.name}
                      className={`capitalize bg-${type.type.name}`}
                    >
                      {type.type.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Height</p>
                  <p className="font-semibold">{pokemon.height / 10}m</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Weight</p>
                  <p className="font-semibold">{pokemon.weight / 10}kg</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Abilities</h2>
                <div className="flex gap-2 flex-wrap">
                  {pokemon.abilities.map((ability: any) => (
                    <Badge
                      key={ability.ability.name}
                      variant="outline"
                      className="capitalize"
                    >
                      {ability.ability.name.replace("-", " ")}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Base Stats</h2>
                <div className="space-y-2">
                  {pokemon.stats.map((stat: any) => (
                    <div key={stat.stat.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm capitalize">
                          {stat.stat.name.replace("-", " ")}
                        </span>
                        <span className="text-sm font-semibold">
                          {stat.base_stat}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-primary rounded-full"
                          style={{
                            width: `${(stat.base_stat / 255) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
