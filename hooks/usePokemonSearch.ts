'use client';

import { useState, useEffect } from 'react';
import { Pokemon } from '@/lib/types';

export function usePokemonSearch(pokemons: Pokemon[], initialType: string = '') {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState(initialType);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>(pokemons);

  useEffect(() => {
    const filtered = pokemons.filter((pokemon) => {
      const matchesSearch = pokemon.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType =
        !selectedType ||
        pokemon.types.some((type) => type.type.name === selectedType);
      return matchesSearch && matchesType;
    });
    setFilteredPokemons(filtered);
  }, [searchTerm, selectedType, pokemons]);

  return {
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    filteredPokemons,
  };
}