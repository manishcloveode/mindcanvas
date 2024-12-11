import Link from "next/link"
import { Bell, Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image";

export default function Navbar() {
    return (
        <header className=" top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
            <div className=" flex h-[57px]  px-4">
                <Link href="/" className="flex items-center">
                    <h1 className="text-4xl font-serif">MindCanvas</h1>
                </Link>
                <div className="hidden md:flex items-center flex-1  mx-4">
                    <div className="relative w-1/3">
                        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 " />
                        <Input
                            type="search"
                            placeholder="Search"
                            className="w-full rounded-full pl-9 bg-gray-50 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4">

                    <Button variant="ghost" size="icon" className="hidden md:flex">
                        <Bell className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full overflow-hidden p-0 h-8 w-8"
                    >
                        <Image
                            src="/rabbit.jpg?height=32&width=32"
                            alt="Profile"
                            height={32}
                            width={32}
                            className="h-full w-full object-cover"
                        />
                    </Button>
                </div>
            </div>
        </header>
    )
}

