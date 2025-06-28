"use client";

import { Pokemon } from "@/lib/types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePokemonSearch } from "@/hooks/usePokemonSearch";
import { PokemonGrid } from "./pokemon-grid";
import { cn } from "@/lib/utils";

interface SearchFormProps {
  types: string[];
  pokemons: Pokemon[];
}

export function SearchForm({ types, pokemons }: SearchFormProps) {
  const {
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    filteredPokemons,
  } = usePokemonSearch(pokemons);

  return (
    <div className="space-y-8">
      <div className="pc:w-[100%] w-[97%] ml-[5px]">
        <div className={cn("mb-4")}>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="md:w-[50%] sm:w-[100%] ">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Input
            placeholder="Search Pokémon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:w-[50%] w-full"
          />
        </div>
      </div>
      <PokemonGrid pokemons={filteredPokemons} />
    </div>
  );
}
