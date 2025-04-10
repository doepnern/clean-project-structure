import { createHashRouter } from "react-router";
import { ListPokemons } from "./pages/ListPokemons";
import { ShowPokemon } from "./pages/ShowPokemon";
import { ErrorPage } from "./pages/ErrorPage";

export const pokemonManagerRouter = createHashRouter([
  {
    path: "/",
    element: <ListPokemons />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:id",
    element: <ShowPokemon />,
    errorElement: <ErrorPage />,
  },
]);
