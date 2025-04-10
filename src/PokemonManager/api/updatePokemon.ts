import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import type { Pokemon } from "../types/Pokemon";
import { pokemonApiQueryKey } from "./queryKey";

type UpdatePokemonParams = {
  id: number;
  values: Partial<Pokemon>;
};

export function updatePokemon({ id, values }: UpdatePokemonParams) {
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
  mutationConfig?: UseMutationOptions<
    Awaited<ReturnType<typeof updatePokemon>>,
    Error,
    Parameters<typeof updatePokemon>[0]
  >;
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
