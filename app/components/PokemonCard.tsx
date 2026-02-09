import Image from "next/image";
import { LikeButton } from "./LikeButton";

interface Pokemon {
  name: string;
  url: string;
  id: string;
  image: string;
}

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default async function PokemonCard({ pokemon }: PokemonCardProps) {
      // const res = await fetch(`/api/like?pokemonName=${pokemon.name}`);
      // const likes = await res.json();
      // console.log(data);
      
  return (
    <li key={pokemon.name}>
      <h3>{pokemon.name}</h3>
      <Image
        src={pokemon.image}
        width={500}
        height={500}
        alt="Image of Pokémon"
      />

      <LikeButton pokemonName={pokemon.name} />
    </li>
  );
}
