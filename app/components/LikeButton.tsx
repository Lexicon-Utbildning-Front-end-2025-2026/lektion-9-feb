"use client";

import { useState } from "react";

interface LikeButtonProps {
	pokemonName: string;
	initialLikes: number; // Ta emot startvärdet här
}

export default function LikeButton({
	pokemonName,
	initialLikes,
}: LikeButtonProps) {
	// Använd initialLikes för att sätta första statet
	const [likes, setLikes] = useState(initialLikes);
	const [hasLiked, setHasLiked] = useState(false);

	const toggleLike = async () => {
		// Optimistisk uppdatering (valfritt men snyggt)
		const newHasLiked = !hasLiked;
		setHasLiked(newHasLiked);

		const res = await fetch("/api/like", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				pokemonName,
				action: newHasLiked ? "like" : "unlike",
			}),
		});

		const data = await res.json();
		setLikes(data.likes);
	};

	return (
		<button
			type="button"
			onClick={toggleLike}
			className={`h-9 px-4 rounded-md shadow-sm transition-colors ${
				hasLiked
					? "bg-red-500 text-white"
					: "bg-gray-500 hover:cursor-pointer text-black hover:bg-blue-500 hover:text-white"
			}`}
		>
			{hasLiked ? "❤️ Liked " : "🤍 Like "}
			{likes > 0 && <span className="ml-2 font-mono">{likes}</span>}
		</button>
	);
}
