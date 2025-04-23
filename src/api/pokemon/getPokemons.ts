import { queryOptions, useQuery } from '@tanstack/react-query';
import { pokemonApiQueryKey } from './queryKey';
import type { QueryConfig } from '../types';
import type { PokemonListing } from './types';

type GetPokemonsParams = {
  limit: number;
  offset: number;
};

export function getPokemons({ limit, offset }: GetPokemonsParams) {
  return fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
  )
    .then((response) => response.json())
    .then(
      (data) =>
        data as {
          count: number;
          next: string;
          previous: string;
          results: PokemonListing[];
        },
    );
}

export function getPokemonsQueryOptions(params: GetPokemonsParams) {
  return queryOptions({
    queryKey: [...pokemonApiQueryKey, params],
    queryFn: () => getPokemons(params),
  });
}

export function useGetPokemons({
  params,
  queryOptions,
}: {
  params: GetPokemonsParams;
  queryOptions?: QueryConfig<typeof getPokemons>;
}) {
  return useQuery({
    ...getPokemonsQueryOptions(params),
    ...queryOptions,
  });
}
