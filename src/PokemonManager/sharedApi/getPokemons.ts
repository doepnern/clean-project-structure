import { queryOptions, useQuery } from "@tanstack/react-query";
import type { PokemonListing } from "../types/Pokemon";
import { pokemonApiQueryKey } from "./queryKey";
import type { QueryConfig } from "../api/types/types";

type GetPokemonsParams = {
	limit: number;
	offset: number;
};

type GetPokemonsQueryFn = (params: GetPokemonsParams) => Promise<{
	count: number;
	next: string;
	previous: string;
	results: PokemonListing[];
}>;

export function getPokemonsQueryOptions(
	params: GetPokemonsParams,
	queryFn: GetPokemonsQueryFn,
) {
	return queryOptions({
		queryKey: [...pokemonApiQueryKey, params],
		queryFn: () => queryFn(params),
	});
}

export function useGetPokemons({
	params,
	queryFn,
	queryOptions,
}: {
	params: GetPokemonsParams;
	queryFn: (params: GetPokemonsParams) => Promise<{
		count: number;
		next: string;
		previous: string;
		results: PokemonListing[];
	}>;
	queryOptions?: QueryConfig<GetPokemonsQueryFn>;
}) {
	return useQuery({
		...getPokemonsQueryOptions(params, queryFn),
		...queryOptions,
	});
}
