"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Star, ThumbsUp, BookmarkIcon, MoreHorizontal } from 'lucide-react'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import Link from 'next/link'

export default function Pokemon() {
    const router = useRouter();
    const [Pokemons, setPokemons] = useState<any[]>([]);
    const [slicedPokemons, setSclicedPokemons] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(Pokemons.length / 10);

    const handleClick = (page: number) => {
        setCurrentPage(page);
        setSclicedPokemons(Pokemons.slice((page - 1) * 10, page * 10));
    }

    const checkPageIsActive = (page: number): boolean => {
        return page === currentPage
    }
    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await fetch("https://dummyapi.online/api/pokemon");
                const result = await response.json();
                setPokemons(result);
                setSclicedPokemons(result.slice(0, 10));
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        fetchPokemons();
    }, []);




    return (

        <>
            <section className="p-8">
                <div className="container mx-auto px-4 md:px-6 py-4 flex gap-8">

                    <main className="flex-1 ">

                        <div className=" bg-white py-4 sticky  top-0 flex gap-6 border-b mb-8">
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
                        {slicedPokemons.slice(0, 10).map((Pokemon) => (
                            <div className="space-y-8 my-8" key={Pokemon.id}>
                                <article className="flex gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="p-1 rounded">
                                                <img
                                                    src={Pokemon.image_url}
                                                    alt={Pokemon.pokemon}
                                                    width="20"
                                                    height="20"
                                                    className="rounded  h-10 w-10"
                                                />
                                            </span>
                                        </div>
                                        <Link href={`/pokemon/${Pokemon.id}`} className="text-xl font-bold mb-1">
                                            {Pokemon.pokemon}
                                        </Link>
                                        <p className="text-gray-500 text-sm mb-2">
                                            {Pokemon.content}
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4" />
                                                <span>{Pokemon.date_published}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <ThumbsUp className="h-4 w-4" />
                                                <span>5.2K likes</span>
                                            </div>
                                            <div>64 comments</div>
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
                                        src={Pokemon.image_url}
                                        alt={Pokemon.pokemon}
                                        width="200"
                                        height="200"
                                        className="rounded"
                                    />
                                </article>
                            </div>
                        ))}
                        <Pagination>
                            <PaginationContent>
                                {currentPage > 1 && (
                                    <PaginationItem>
                                        <PaginationPrevious onClick={() => handleClick(currentPage - 1)} />
                                    </PaginationItem>
                                )}
                                {Array.from({ length: totalPages }, (_, index) => {
                                    const page = index + 1;
                                    return (
                                        <PaginationItem key={page}>
                                            <PaginationLink
                                                onClick={() => handleClick(page)}
                                                isActive={checkPageIsActive(page)}
                                            >
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                })}
                                {currentPage < totalPages && (
                                    <PaginationItem>
                                        <PaginationNext onClick={() => handleClick(currentPage + 1)} />
                                    </PaginationItem>
                                )}
                            </PaginationContent>
                        </Pagination>
                    </main>



                </div>
            </section>
        </>
    );
}
