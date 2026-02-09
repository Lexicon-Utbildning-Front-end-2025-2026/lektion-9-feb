import Image from "next/image";
import LikeButton from "./LikeButton"; // Se till att exporten matchar

interface Pokemon {
  name: string;
  url: string;
  id: string;
  image: string;
}

interface PokemonCardProps {
  pokemonData: Pokemon;
}

export default async function PokemonCard({ pokemonData }: PokemonCardProps) {
  // 1. Hämta initial data direkt på servern
  // Vi lägger till { cache: 'no-store' } för att säkerställa att vi får färsk data
  const res = await fetch(`http://localhost:3000/api/like?pokemonName=${pokemonData.name}`, { 
    cache: 'no-store' 
  });
  const data = await res.json();
  const initialLikes = data.likes || 0;

  return (
    <li className="list-none border p-4 rounded-lg">
      <h3 className="capitalize font-bold">{pokemonData.name}</h3>
      <Image
        src={pokemonData.image}
        width={200} 
        height={200}
        alt={`Image of ${pokemonData.name}`}
      />

      {/* 2. Skicka ner datan till Client Componenten */}
      <LikeButton pokemonName={pokemonData.name} initialLikes={initialLikes} />
    </li>
  );
}