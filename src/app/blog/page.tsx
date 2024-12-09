"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Clock, BookmarkIcon, MoreHorizontal, Slice } from 'lucide-react'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import Link from 'next/link'
import Image from 'next/image'

export default function Blog() {

    const [blogs, setBlogs] = useState<any[]>([]);
    const [clicedBlogs, setSclicedBlogs] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);


    const totalPages = Math.ceil(blogs.length / 10);



    const handlePageClick = (page: number) => {
        setCurrentPage(page);
        setSclicedBlogs(blogs.slice((page - 1) * 10, page * 10));
    }

    const checkPageIsActive = (page: number): boolean => {
        return page === currentPage;
    }

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch("https://dummyapi.online/api/blogposts");
                const result = await response.json();
                setBlogs(result);
                setSclicedBlogs(result.slice(0, 10));
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, []);



    return (
        <>
            <section className="p-8">
                <div className="container mx-auto px-4 md:px-6 py-4 flex gap-8">
                    <main className="flex-1 ">
                        <div className="sticky top-0 bg-white py-4 flex gap-6 border-b mb-8">
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
                        {clicedBlogs.slice(0, 10).map((blog) => (
                            <div className="space-y-8 my-8" key={blog.id}>
                                <article className="flex gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="bg-gray-100 p-1 rounded">
                                                <Image
                                                    src="/img.avif?height=20&width=20"
                                                    alt="Stackoverflow"
                                                    width={20}
                                                    height={20}
                                                    className="rounded"
                                                />
                                            </span>
                                            <span className="text-sm text-gray-500">By {blog.author}</span>
                                        </div>
                                        <Link href={`/blog/${blog.id}`} className="text-xl font-bold mb-1">
                                            {blog.title}
                                        </Link>
                                        <p className="text-gray-500 text-sm mb-2">
                                            {blog.content}
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4" />
                                                <span>{blog.date_published}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                <span>5.2K views</span>
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
                                    <Image
                                        src="/img.avif?height=100&width=100"
                                        alt="Article thumbnail"
                                        width={100}
                                        height={100}
                                        className="rounded"
                                    />
                                </article>
                            </div>
                        ))}


                        <Pagination>
                            <PaginationContent>
                                {currentPage > 1 && (
                                    <PaginationItem>
                                        <PaginationPrevious onClick={() => handlePageClick(currentPage - 1)} />
                                    </PaginationItem>
                                )}
                                {Array.from({ length: totalPages }, (_, index) => {
                                    const page = index + 1;
                                    return (
                                        <PaginationItem key={page}>
                                            <PaginationLink
                                                onClick={() => handlePageClick(page)}
                                                isActive={checkPageIsActive(page)}
                                            >
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    );
                                })}
                                {currentPage < totalPages && (
                                    <PaginationItem>
                                        <PaginationNext onClick={() => handlePageClick(currentPage + 1)} />
                                    </PaginationItem>
                                )}
                            </PaginationContent>
                        </Pagination>


                    </main>


                    <aside className="hidden lg:block w-[368px]">
                        <div className="sticky top-14 space-y-8">

                            <section>
                                <h2 className="font-bold mb-4">Staff Picks</h2>
                                <div className="space-y-4">
                                    <div className=" rounded-full flex gap-3">
                                        <Image
                                            src="/download.jpeg?height=20&width=20"
                                            alt="Dr. Jess Greier"
                                            width={20}
                                            height={20}
                                            className="rounded-full"
                                        />
                                        <div>
                                            <div className="flex items-center gap-1">
                                                <span className="text-sm font-medium">Dr. Jess Greier</span>
                                            </div>
                                            <h3 className="font-bold leading-snug">
                                                I'm a Public Health Scientist. Here's What Research Really Shows About Raw Milk.
                                            </h3>
                                            <span className="text-xs text-gray-500">1d ago</span>
                                        </div>
                                    </div>
                                </div>
                            </section>
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
                </div>
            </section>
        </>
    );
}
