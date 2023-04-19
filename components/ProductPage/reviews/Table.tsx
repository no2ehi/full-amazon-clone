import { useState } from "react";
import { usePagination } from "./Pagination";
import Image from "next/image";
import ReviewCard from "./ReviewCard";
import { Pagination } from "@mui/material";
import TableHeader from "./TableHeader";

const Table = ({ reviews, allSizes, colors }: any) => {
    // console.log("table review: ", reviews);
    const [page, setPage] = useState(1);
    const PER_PAGE = 3;
    const count = Math.ceil(reviews.length / PER_PAGE);
    const _DATA = usePagination(reviews, PER_PAGE);

    const handleChange = (e: any, p: any) => {
        setPage(p);
        _DATA.jump(p);
    };

    return (
        <div className="mt-4 flex flex-col">
            <TableHeader
                reviews={reviews}
                allSizes={[{ size: "All" }, ...allSizes]}
                colors={[{ color: "All", image: "" }, ...colors]}
            />
            <div className="my-2">
                {_DATA.currentData().map((review: any, i: any) => (
                    <ReviewCard review={review} key={i} />
                ))}
            </div>
            <div className="mt-2 ml-auto">
                <Pagination
                    count={count}
                    page={page}
                    shape="rounded"
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

export default Table;
