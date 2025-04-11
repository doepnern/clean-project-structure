import { Container } from '@mantine/core';
import { useRouteError } from 'react-router';
import { ZodError } from 'zod';

function formatError(error: unknown) {
  if (error instanceof ZodError) {
    const [firstError, ...rest] = error.issues;
    return rest.length > 0
      ? `${firstError.message} and ${rest.length} more errors`
      : firstError.message;
  }
  return 'Please try again later';
}

export function ErrorPage() {
  const error = useRouteError();
  return (
    <Container size="xs" style={{ textAlign: 'center' }}>
      <h1>Oh no, something went wrong</h1>
      {formatError(error)}
    </Container>
  );
}
