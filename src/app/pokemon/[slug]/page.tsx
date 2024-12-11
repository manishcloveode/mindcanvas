'use client'

import { useEffect, useState } from "react"

import Link from 'next/link'
import { Bookmark, Share2, MoreHorizontal, MessageSquare, PlayIcon as Clap, ArrowLeft } from 'lucide-react'

export default function PokemonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const [slug, setSlug] = useState<string | null>(null)
    const [pokemon, setPokemon] = useState<any>(null)

    useEffect(() => {
        params.then((resolvedParams) => {
            setSlug(resolvedParams.slug)
        })
    }, [params])

    useEffect(() => {
        if (!slug) return

        const fetchPokemonPost = async () => {
            try {
                const response = await fetch(
                    `https://dummyapi.online/api/pokemon/${slug}`
                )
                const result = await response.json()
                setPokemon(result)
            } catch (error) {
                console.error("Error fetching pokemon post:", error)
            }
        }

        fetchPokemonPost()
    }, [slug])

    if (!pokemon) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <nav className="container mx-auto px-4 py-4">
                    <Link href="/pokemon" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Back to Pokémon List
                    </Link>
                </nav>
            </header>

            <article className="container mx-auto px-4 pt-8 max-w-4xl">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6 sm:p-10">
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-gray-900">
                            {pokemon.pokemon}
                        </h1>

                        <div className="flex flex-col md:flex-row gap-8 mb-8">
                            <div className="md:w-1/2">
                                <img
                                    src={pokemon.image_url}
                                    alt={pokemon.pokemon}
                                    width={400}
                                    height={400}
                                    className="rounded-lg shadow-md border border-gray-200 w-full h-auto object-cover"
                                />
                            </div>

                            <div className="md:w-1/2 bg-gray-50 rounded-lg shadow-inner p-6 border border-gray-200">
                                {[
                                    { label: "Location", value: pokemon.location },
                                    { label: "Evolutions", value: pokemon.evolutions },
                                    { label: "Hitpoints", value: pokemon.hitpoints },
                                    { label: "Abilities", value: pokemon.abilities },
                                    { label: "Type", value: pokemon.type },
                                ].map((item) => (
                                    <div key={item.label} className="mb-4">
                                        <strong className="text-gray-700 font-semibold block mb-1">{item.label}:</strong>
                                        <p className="text-gray-600">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                            <div className="flex items-center space-x-4">
                                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    <Clap className="h-5 w-5 mr-2" />
                                    Like
                                </button>
                                <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    <MessageSquare className="h-5 w-5 mr-2" />
                                    Comment
                                </button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    <Bookmark className="h-5 w-5" />
                                </button>
                                <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    <Share2 className="h-5 w-5" />
                                </button>
                                <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    <MoreHorizontal className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    )
}

