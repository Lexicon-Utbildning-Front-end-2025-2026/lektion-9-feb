import Image from "next/image";

// Vi definierar ett interface för att TypeScript ska vara nöjt
interface Pokemon {
  name: string;
  url: string;
  id: string;
  image: string;
}

// 1. Funktion för att hämta Pokémon
async function getPokemon(): Promise<Pokemon[]> {
  try {
    // Försök hämta data från API:et
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
    );

    // Om svaret inte är OK (t.ex 404, 500)
    if (!response.ok) {
      console.log(response);
      throw new Error("Kunde inte hämta våra Pokémon");
    }
    // Gör om svaret till JSON
    const data = await response.json();

    // Här mappar vi om datan
    // data innehåller ju bara {name, url}
    // Vi skapar en array av fetch-anrop (promises) för varje Pokémon:
    const detailPromises = data.results.map(async (p: { url: string }) => {
      const resp = await fetch(p.url);
      if (!resp.ok) throw new Error("Kunde inte hämta detaljer");
      return resp.json();
    });

    // Vi väntar på att ALLA detalj-fetchar ska bli klara parallellt
    const detailedResponses = await Promise.all(detailPromises);

    // Vi mappar om de detaljerade svaren till vårt enkla Pokémon-interface
    return detailedResponses.map((details) => ({
      name: details.name,
      url: `https://pokeapi.co/api/v2/pokemon/${details.id}`,
      id: details.id.toString(),
      image: details.sprites.front_default,
    }));
  } catch (error) {
    // Fångar alla fel som sker ovan:
    // Nätverksfel
    // API-fel
    // JSON-fel
    console.error("Fel vid hämtning: ", error);
    throw error;
    // Skicka vidare felet (så komponenten kan hantera det)
  }
}

// 2. Komponenten
export default async function HomePage() {
  try {
    // Försök hämta Pokémon
    const pokemonList = await getPokemon();
    console.log(pokemonList);

    return (
      <main>
        <h1>Min Poké-Shop</h1>
        <p>Denna data hämtas direkt vid sidladdning.</p>
        <ul>
          {pokemonList.map((pokemon: { name: string, image: string }) => (
            <li key={pokemon.name}>
              <h3>{pokemon.name}</h3>
              <Image
                src={pokemon.image}
                width={500}
                height={500}
                alt="Image of Pokémon"
              />
            </li>
          ))}
        </ul>
      </main>
    );
  } catch (error) {
    // Om något går fel -> visa fallback-UI istället
    console.error("Fel vid hämtning:", error);
    throw error;
  }
}
