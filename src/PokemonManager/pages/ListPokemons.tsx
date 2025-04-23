import { useGetPokemons } from '@/api/pokemon/getPokemons';
import { useUpdatePokemon } from '@/api/pokemon/updatePokemon';
import {
  Container,
  Pagination,
  Button,
  Flex,
  Grid,
  LoadingOverlay,
} from '@mantine/core';
import { useState } from 'react';
import { NavLink as RouterNav } from 'react-router';

export function ListPokemons() {
  const [paginationState, setPaginationState] = useState({
    page: 1,
    limit: 10,
  });

  const { data, status, fetchStatus, isPending, isSuccess } = useGetPokemons({
    params: {
      limit: paginationState.limit,
      offset: (paginationState.page - 1) * paginationState.limit,
    },
  });

  const { mutate: updatePokemon, isPending: isUpdatingPokemon } =
    useUpdatePokemon({
      mutationConfig: {},
    });
  return (
    <Container size="xs">
      <h1>List of Pokemons</h1>
      <p>status: {status}</p>
      <p>fetchStatus: {fetchStatus}</p>
      <div style={{ height: '540px', position: 'relative' }}>
        {paginationState.page}- {paginationState.limit}
        {isPending && <LoadingOverlay visible />}
        {isSuccess && (
          <Flex gap="sm" direction="column">
            {data?.results.map((pokemon) => (
              <Grid key={pokemon.name}>
                <Grid.Col span={8}>
                  <Button
                    fullWidth
                    component={RouterNav}
                    to={`/${
                      pokemon.url.split('/')[pokemon.url.split('/').length - 2]
                    }`}
                    key={pokemon.name}
                  >
                    {pokemon.name}
                  </Button>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Button
                    variant="outline"
                    disabled={isUpdatingPokemon}
                    onClick={() => {
                      const id =
                        pokemon.url.split('/')[
                          pokemon.url.split('/').length - 2
                        ];
                      updatePokemon({
                        id: Number.parseInt(id),
                        data: { name: 'test' },
                      });
                    }}
                  >
                    Update
                  </Button>
                </Grid.Col>
              </Grid>
            ))}
          </Flex>
        )}
      </div>
      <Pagination
        mt="lg"
        total={1000}
        value={paginationState.page}
        onChange={(page) => setPaginationState((prev) => ({ ...prev, page }))}
      />
    </Container>
  );
}
