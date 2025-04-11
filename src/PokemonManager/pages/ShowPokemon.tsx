import { useParams } from 'react-router';
import { useGetPokemon } from '../api/getPokemon';
import { Container } from '@mantine/core';
import { z } from 'zod';

const prarmsSchema = z.object({
  id: z.coerce.number({
    message: 'id must be a number',
  }),
});

export function ShowPokemon() {
  const params = useParams();
  const { id } = prarmsSchema.parse(params);

  const { data, status, fetchStatus } = useGetPokemon({
    params: { id },
    queryOptions: {
      throwOnError: true,
    },
  });
  return (
    <Container size="xs">
      <h1>Pokemon</h1>
      <p>status: {status}</p>
      <p>fetchStatus: {fetchStatus}</p>

      {data && (
        <div>
          <h2>{data.name}</h2>
          <p>Height: {data.height}</p>
          <p>Weight: {data.weight}</p>
        </div>
      )}
    </Container>
  );
}
