'use client'

import { Bookmark, Play, Share2, MoreHorizontal, MessageSquare, PlayIcon as Clap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { useEffect, useState } from "react"
import Link from 'next/link'

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
    const [slug, setSlug] = useState<string | null>(null)
    const [blog, setBlog] = useState<any>(null)

    useEffect(() => {
        params.then((resolvedParams) => {
            setSlug(resolvedParams.slug)
        })
    }, [params])

    useEffect(() => {
        if (!slug) return
        const fetchBlogPost = async () => {
            try {
                const response = await fetch(
                    `https://dummyapi.online/api/blogposts/${slug}`
                )
                const result = await response.json()
                setBlog(result)
            } catch (error) {
                console.error("Error fetching blog post:", error)
            }
        }

        fetchBlogPost()
    }, [slug])

    if (!blog) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen pb-16">
            <header className="bg-white shadow-sm sticky top-0 ">
                <nav className="container mx-auto px-4 py-4">
                    <Link href="/blog" className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                        ← Back to Blog
                    </Link>
                </nav>
            </header>

            <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-8">
                        <h1 className="text-4xl font-bold tracking-tight mb-6 text-gray-900">
                            {blog.title}
                        </h1>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <Image
                                    src="/img.avif?height=48&width=48"
                                    alt="Author"
                                    width={48}
                                    height={48}
                                    className="rounded-full"
                                />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-gray-900">{blog.author}</span>
                                        <Button
                                            variant="ghost"
                                            className="h-8 rounded-full text-green-600 hover:text-green-700 hover:bg-green-50 px-4 text-sm"
                                        >
                                            Follow
                                        </Button>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <span>4 min read</span>
                                        <span className="mx-1">·</span>
                                        <span>{blog.date_published}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-8">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-700">
                                        <Clap className="w-5 h-5" />
                                    </Button>
                                    <span className="text-sm text-gray-500">2.1K</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-700">
                                        <MessageSquare className="w-5 h-5" />
                                    </Button>
                                    <span className="text-sm text-gray-500">82</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-700">
                                    <Bookmark className="w-5 h-5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-700">
                                    <Play className="w-5 h-5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-700">
                                    <Share2 className="w-5 h-5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-700">
                                    <MoreHorizontal className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-700 leading-relaxed">
                                {blog.content}
                            </p>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    )
}

