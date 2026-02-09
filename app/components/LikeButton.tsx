"use client";

import { useEffect, useState } from "react";

interface LikeButtonProps {
	pokemonName: string;
}

export default function LikeButton({ pokemonName }: LikeButtonProps) {
	const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);

	// Hämta antal likes vid mount
	useEffect(() => {
		// setup
		const fetchLikes = async () => {
			const res = await fetch(`/api/like?pokemonName=${pokemonName}`);
			const data = await res.json();
			setLikes(data.likes);
		};
		fetchLikes();
	}, [pokemonName]);

	const toggleLike = async () => {
		const res = await fetch("/api/like", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				pokemonName,
				action: hasLiked ? "unlike" : "like",
			}),
		});
		const data = await res.json();
		setLikes(data.likes);
        setHasLiked(!hasLiked);
        console.log(data);
	};

	return (
		<button
			onClick={toggleLike}
			className={`h-9 px-4 rounded-md shadow-sm
                ${hasLiked ? "bg-red-500 text-white" : "hover:bg-blue-500 hover:text-white"}`}
			type="button"
		>
            {hasLiked ? "Liked " : "Like "}
			{likes > 0 && <span>{likes}</span>}
		</button>
	);
}
