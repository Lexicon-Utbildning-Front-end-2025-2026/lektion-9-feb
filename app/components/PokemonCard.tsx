import Image from "next/image";
import LikeButton from "./LikeButton";

interface Pokemon {
  name: string;
  url: string;
  id: string;
  image: string;
}

interface PokemonCardProps { // interface för props som kommer in i pokemoncard
    pokemonData: Pokemon;
}

// props = PokemonCardProps
// props.pokemon = Pokemon

export default function PokemonCard({pokemonData}: PokemonCardProps) {
	return (
		<li key={pokemonData.name}>
			<h3>{pokemonData.name}</h3>
			<Image
				src={pokemonData.image}
				width={500}
				height={500}
				alt="Image of Pokémon"
			/>
            <LikeButton pokemonName={pokemonData.name} />
		</li>
	);
}
