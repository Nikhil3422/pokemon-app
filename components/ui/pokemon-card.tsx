"use client";

import { Pokemon } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const router = useRouter();

  return (
    <Card
      className="group cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={() => router.push(`/pokemon/${pokemon.name}`)}
    >
      <div className="p-4 flex flex-col items-center">
        <div className="w-full aspect-square relative mb-4">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200"
          />
        </div>
        <p className="text-lg font-semibold capitalize mb-2 text-blue-300">{`Details ->`}</p>
        <h3 className="text-lg font-semibold capitalize mb-2">
          {pokemon.name}
        </h3>
        <div className="flex gap-2 flex-wrap justify-center">
          {pokemon.types.map((type) => (
            <Badge
              key={type.type.name}
              className={`capitalize bg-green-500 ${type.type.name}`}
            >
              {type.type.name}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}
