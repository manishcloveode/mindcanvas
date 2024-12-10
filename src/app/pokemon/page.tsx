'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Star, ThumbsUp, BookmarkIcon, MoreHorizontal } from "lucide-react";
import Pagination from "@/component/Pagination";
import Link from "next/link";

export default function Pokemon() {
    const router = useRouter();
    const [Pokemons, setPokemons] = useState<any[]>([]);
    const [slicedPokemons, setSlicedPokemons] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(Pokemons.length / 10);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setSlicedPokemons(Pokemons.slice((page - 1) * 10, page * 10));
    };
    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await fetch("https://dummyapi.online/api/pokemon");
                const result = await response.json();
                setPokemons(result);
                setSlicedPokemons(result.slice(0, 10));
            } catch (error) {
                console.error("Error fetching pokemons:", error);
            }
        };
        fetchPokemons();
    }, []);

    return (
        <section className="p-4 sm:p-6 md:p-8">
            <div className="container mx-auto px-4 md:px-6 py-4">
                <main className="w-full">
                    <div className="bg-white py-4 sticky top-0 flex gap-4 sm:gap-6 border-b mb-8 overflow-x-auto">
                        {["Blog", "Movies", "Pokemon"].map((item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase()}`}
                                className="text-sm whitespace-nowrap text-gray-500 pb-2 border-b border-black"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                    {slicedPokemons.map((Pokemon) => (
                        <div className="space-y-8 my-8" key={Pokemon.id}>
                            <article className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                                <div className="flex-1 order-2 sm:order-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="p-1 rounded">
                                            <img
                                                src={Pokemon.image_url}
                                                alt={Pokemon.pokemon}
                                                width={40}
                                                height={40}
                                                className="rounded h-10 w-10"
                                            />
                                        </span>
                                    </div>
                                    <Link href={`/pokemon/${Pokemon.id}`} className="text-xl font-bold mb-1 block">
                                        {Pokemon.pokemon}
                                    </Link>
                                    <p className="text-gray-500 text-sm mb-2">
                                        {Pokemon.content}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-500">
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
                                    width={200}
                                    height={200}
                                    className="rounded order-1 sm:order-2 w-full sm:w-auto max-w-[200px] mx-auto"
                                />
                            </article>
                        </div>
                    ))}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </main>
            </div>
        </section>
    );
}


