'use client'

import { useEffect, useState } from "react"
import { Bookmark, Play, Share2, MoreHorizontal, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function MovieDetails({ params }: { params: Promise<{ slug: string }> }) {
    const [slug, setSlug] = useState<string | null>(null)
    const [movie, setMovie] = useState<any>(null)

    useEffect(() => {
        params.then((resolvedParams) => {
            setSlug(resolvedParams.slug)
        })
    }, [params])

    useEffect(() => {
        if (!slug) return

        const fetchMoviePost = async () => {
            try {
                const response = await fetch(
                    `https://freetestapi.com/api/v1/movies/${slug}`
                )
                const result = await response.json()
                setMovie(result)
            } catch (error) {
                console.error("Error fetching movies post:", error)
            }
        }

        fetchMoviePost()
    }, [slug])

    if (!movie) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    return (
        <div className="container bg-gray-50 mx-auto ">
            <header className="bg-white shadow-sm sticky top-0 ">
                <nav className="container mx-auto px-4 py-4">
                    <Link href="/movies" className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                        ← Back to Movies
                    </Link>
                </nav>
            </header>
            <Card className="w-full mt-8  max-w-4xl mx-auto">
                <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <CardTitle className="text-3xl font-bold">{movie.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{movie.year} • {movie.runtime} min</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-yellow-600">
                            <Star className="w-4 h-4 mr-1" />
                            {movie.rating}
                        </Badge>
                        <Button variant="outline" size="icon">
                            <Bookmark className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <Play className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <Share2 className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                            <img
                                src={movie.poster || "/placeholder.svg?height=450&width=300"}
                                alt={`${movie.title} poster`}
                                width={300}
                                height={450}
                                className="rounded-lg shadow-lg w-full"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">Genre</TableCell>
                                        <TableCell>{movie.genre.join(", ")}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Director</TableCell>
                                        <TableCell>{movie.director}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Actors</TableCell>
                                        <TableCell>{movie.actors.join(", ")}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Plot</TableCell>
                                        <TableCell>{movie.plot}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Awards</TableCell>
                                        <TableCell>{movie.awards}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Country</TableCell>
                                        <TableCell>{movie.country}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Language</TableCell>
                                        <TableCell>{movie.language}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Box Office</TableCell>
                                        <TableCell>{movie.boxOffice}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Production</TableCell>
                                        <TableCell>{movie.production}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <div className="mt-4 flex justify-between items-center">
                                <a href={movie.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    Official Website
                                </a>
                                <a href={movie.trailer} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                                    <Play className="w-4 h-4 mr-2" />
                                    Watch Trailer
                                </a>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

