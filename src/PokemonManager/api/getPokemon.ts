import { queryOptions, useQuery } from "@tanstack/react-query";
import type { Pokemon } from "../types/Pokemon";
import { pokemonApiQueryKey } from "./queryKey";

type GetPokemonParams = {
  id: number;
};

export function getPokemon({ id }: GetPokemonParams) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => response.json())
    .then((data) => data as Pokemon);
}

export function getPokemonQueryOptions(params: GetPokemonParams) {
  return queryOptions({
    queryKey: [...pokemonApiQueryKey, params],
    queryFn: () => getPokemon(params),
  });
}

export function useGetPokemon({
  params,
  queryOptions,
}: {
  params: GetPokemonParams;
  queryOptions?: Partial<ReturnType<typeof getPokemonQueryOptions>>;
}) {
  return useQuery({
    ...getPokemonQueryOptions(params),
    ...queryOptions,
  });
}
