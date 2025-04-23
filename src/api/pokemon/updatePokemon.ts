import { useMutation, useQueryClient } from '@tanstack/react-query';
import { pokemonApiQueryKey } from './queryKey';
import type { MutationConfig } from '../types';
import { z } from 'zod';
import type { Pokemon } from './types';

export const updatePokemonInputSchema = z.object({
  name: z.string().min(1, 'Pokemon Name muss mindestens ein zeichen lang sein'),
});

export async function updatePokemon({
  id,
  data,
}: {
  id: number;
  data: z.infer<typeof updatePokemonInputSchema>;
}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        ...data,
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
