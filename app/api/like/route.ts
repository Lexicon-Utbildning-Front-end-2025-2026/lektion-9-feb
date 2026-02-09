import { NextResponse } from "next/server"

const likesStore = new Map<string, number>()

export async function POST(request: Request) {
    const { pokemonName, action } = await request.json()

    const currentLikes = likesStore.get(pokemonName) || 0

    const newLikes =
        action === "like"
            ? currentLikes + 1
            : Math.max(currentLikes - 1, 0)

    likesStore.set(pokemonName, newLikes)

    return NextResponse.json({
        pokemonName,
        likes: newLikes,
    })
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const pokemonName = searchParams.get("pokemonName")

    if (!pokemonName) {
        return NextResponse.json(
            { error: "Pokémon name required" },
            { status: 400 }
        )
    }

    const likes = likesStore.get(pokemonName) || 0

    return NextResponse.json({ pokemonName, likes })
}
