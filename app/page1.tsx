import Image from "next/image";

// 1. definiera hur datan ser ut från GraphQL-svaret
interface Pokemon {
  id: number;
  name: string;
  height: number;
  pokemon_v2_pokemonsprites: {
    sprites: {
      front_default: string;
    };
  }[];
}

async function getGraphQLPokemon() {
  const response = await fetch("https://beta.pokeapi.co/graphql/v1beta1", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
            query Pokemons {
                pokemon_v2_pokemon(limit: 20) {
                    name
                    id
                    height
                    pokemon_v2_pokemonsprites {
                        sprites
                    }
                }    
            }
            `,
    }),
  });
  if (!response.ok) {
    throw new Error("Kunde inte hämta data via graphql");
  }
  const json = await response.json();

  return json.data.pokemon_v2_pokemon;
}

export default async function HomePage() {
  try {
    const pokemons = await getGraphQLPokemon();

    return (
      <section>
        <ul>
          {pokemons.map((pokemon: Pokemon) => (
            <li key={pokemon.name}>
              <h3>{pokemon.name}</h3>
              <Image
                src={pokemon.pokemon_v2_pokemonsprites[0].sprites.front_default}
                width={200}
                height={200}
                alt="Image of Pokémon"
              />
            </li>
          ))}
        </ul>
      </section>
    );
  } catch (error) {
    console.error("Fel vid hämtning: ", error);
    throw new Error("Misslyckades att hämta Pokémon");
  }
}
