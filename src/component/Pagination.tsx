"use client";

import {
    Pagination as UIPagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    const handlePageClick = (page: number) => {
        onPageChange(page);
    };

    const checkPageIsActive = (page: number): boolean => page === currentPage;

    return (
        <UIPagination>
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
        </UIPagination>
    );
}
