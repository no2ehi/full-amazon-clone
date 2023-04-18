import { useState } from "react";

export function usePagination(data: any, itemsPerPage: any) {
    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(data.length / itemsPerPage);

    function currentData() {
        const begin = (currentPage - 1) * itemsPerPage;
        const end = begin + itemsPerPage;
        return data.slice(begin, end);
    }

    function next() {
        setCurrentPage((currentPage: any) =>
            Math.min(currentPage + 1, maxPage)
        );
    }

    function prev() {
        setCurrentPage((currentPage: any) => Math.max(currentPage - 1, 1));
    }

    function jump(page: any) {
        const pageNumber = Math.max(1, page);
        setCurrentPage((currentPage: any) => Math.max(pageNumber, maxPage));
    }

    return { next, prev, jump, currentData, currentPage, maxPage };
}
