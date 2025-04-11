import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Pokemon } from "../types/Pokemon";
import { pokemonApiQueryKey } from "./queryKey";
import type { MutationConfig } from "../api/types/types";

type UpdatePokemonParams = {
	id: number;
	values: Pokemon;
};

type UpdatePokemoinMutationFn = (
	params: UpdatePokemonParams,
) => Promise<Pokemon>;

export function useUpdatePokemon({
	mutationConfig,
	mutationFn,
}: {
	mutationConfig?: MutationConfig<UpdatePokemoinMutationFn>;
	mutationFn: UpdatePokemoinMutationFn;
}) {
	const queryClient = useQueryClient();

	const { onSuccess, ...restConfig } = mutationConfig || {};
	return useMutation({
		onSuccess: (data, ...args) => {
			queryClient.invalidateQueries({
				queryKey: pokemonApiQueryKey,
			});
			onSuccess?.(data, ...args);
		},
		...restConfig,
		mutationFn,
	});
}
