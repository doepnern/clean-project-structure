import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Pokemon } from "../types/Pokemon";
import { pokemonApiQueryKey } from "./queryKey";
import type { MutationConfig } from "./types/types";

type UpdatePokemonParams = {
	id: number;
	values: Partial<Pokemon>;
};

export async function updatePokemon({ id, values }: UpdatePokemonParams) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				id,
				...values,
			});
		}, 1000);
	}).then((data) => data as Pokemon);
}

export function useUpdatePokemon({
	mutationConfig = {},
}: {
	mutationConfig?: MutationConfig<typeof updatePokemon>;
}) {
	const queryClient = useQueryClient();

	const { onSuccess, ...restConfig } = mutationConfig;
	return useMutation({
		onSuccess: (data, ...args) => {
			queryClient.invalidateQueries({
				queryKey: pokemonApiQueryKey,
			});
			onSuccess?.(data, ...args);
		},
		...restConfig,
		mutationFn: updatePokemon,
	});
}
