"use client";

import { useEffect, useState } from "react";

import { Star, BookmarkIcon, MoreHorizontal } from 'lucide-react'
import Pagination from "@/component/Pagination";

import Link from 'next/link'
import Image from 'next/image'

export default function Movies() {

    const [movies, setMovies] = useState<any[]>([]);
    const [slicedMovies, setSclicedMovies] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(movies.length / 10);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setSclicedMovies(movies.slice((page - 1) * 10, page * 10));
    };

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch("https://freetestapi.com/api/v1/movies");
                const result = await response.json();
                setMovies(result);
                setSclicedMovies(result.slice(0, 10));
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);


    return (
        <>
            <section className="p-4 sm:p-6 md:p-8">
                <div className="container mx-auto ">
                    <main className="flex-1 ">
                        <div className="sticky py-4 bg-white top-0 flex gap-6 border-b mb-8">
                            <Link href="/blog"
                                className="text-sm text-gray-500 pb-2 border-b border-black"
                            >
                                Blog
                            </Link>

                            <Link href="/movies"
                                className="text-sm text-gray-500 pb-2 border-b border-black"
                            >
                                movies
                            </Link>
                            <Link href="/pokemon"
                                className="text-sm text-gray-500 pb-2 border-b border-black"
                            >
                                pokemon
                            </Link>
                        </div>
                        <div className="space-y-8">
                            {slicedMovies.slice(0, 10).map((movie) => (
                                <article className="flex gap-6" key={movie.id} >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="bg-gray-100 p-1 rounded">
                                                <Image
                                                    src="/cinema.webp?height=20&width=20"
                                                    alt="Stackoverflow"
                                                    width={20}
                                                    height={20}
                                                    className="rounded"
                                                />
                                            </span>

                                        </div>
                                        <h2 className="text-xl font-bold mb-1">
                                            <Link href={`/movies/${movie.id}`} className="text-xl font-bold mb-1">
                                                {movie.title}
                                            </Link>
                                        </h2>
                                        <p className="text-gray-500 text-sm mb-2">
                                            {movie.plot}
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4" />
                                                <span>{movie.awards}</span>
                                            </div>


                                            <div className="flex-1"></div>
                                            <button className="p-2 hover:bg-gray-100 rounded-full">
                                                <BookmarkIcon className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 hover:bg-gray-100 rounded-full">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <img
                                        src={movie.poster}
                                        alt={movie.title}
                                        width={100}
                                        height={100}
                                        className="rounded"
                                    />
                                </article>


                            ))}
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </main>


                    <aside className="hidden  lg:block w-[368px]">
                        <div className=" sticky top-24 space-y-8">


                            <section>
                                <h2 className="font-bold mb-4">Recommended topics</h2>
                                <div className="flex flex-wrap gap-2">
                                    <Link href="#" className="px-4 py-2 rounded-full bg-gray-100 text-sm">
                                        Programming
                                    </Link>
                                    <Link href="#" className="px-4 py-2 rounded-full bg-gray-100 text-sm">
                                        Self Improvement
                                    </Link>
                                    <Link href="#" className="px-4 py-2 rounded-full bg-gray-100 text-sm">
                                        Data Science
                                    </Link>
                                    <Link href="#" className="px-4 py-2 rounded-full bg-gray-100 text-sm">
                                        Writing
                                    </Link>
                                    <Link href="#" className="px-4 py-2 rounded-full bg-gray-100 text-sm">
                                        Technology
                                    </Link>
                                    <Link href="#" className="px-4 py-2 rounded-full bg-gray-100 text-sm">
                                        Relationships
                                    </Link>
                                    <Link href="#" className="px-4 py-2 rounded-full bg-gray-100 text-sm">
                                        politics
                                    </Link>
                                </div>
                                <Link href="#" className="text-sm text-green-600 mt-4 inline-block">
                                    See more topics
                                </Link>
                            </section>

                            <section>
                                <h2 className="font-bold mb-4">Who to follow</h2>
                                <div className="flex items-center gap-3">
                                    <Image
                                        src="/who to follow.jpeg?height=50&width=50"
                                        alt="Raphael Moutard"
                                        width={50}
                                        height={50}
                                        className="rounded-full"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-medium">Raphael Moutard</h3>
                                        <p className="text-sm text-gray-500">Description here</p>
                                    </div>
                                    <button className="px-4 py-1.5 rounded-full border border-gray-300 text-sm">
                                        Follow
                                    </button>
                                </div>
                            </section>
                        </div>
                    </aside>
                </div >
            </section >
        </>
    );
}

