import { useState } from "react";
import { usePagination } from "./Pagination";
import Image from "next/image";

const Table = ({ reviews }: any) => {
    console.log("table review: ", reviews);
    const [page, setPage] = useState(1);
    const PER_PAGE = 3;
    const count = Math.ceil(reviews.length / PER_PAGE);
    const _DATA = usePagination(reviews, PER_PAGE);

    const handleChange = (e: any, p: any) => {
        setPage(p);
        _DATA.jump(p);
    };

    return (
        <div>
            <div>header</div>
            <div className="my-2">
                {_DATA.currentData().map((review: any, i: any) => (
                    <div className="flex flex-col" key={i}>
                        <div className="flex space-x-4">
                            <span className="font-semibold">{review.reviewBy.name}</span>
                            <span>size: {review.size}</span>
                            <span>fit: {review.fit}</span>
                        </div>
                        <div className="flex">
                            <span>{review.review}</span>
                            <span className="flex space-x-2">
                                {review.images &&
                                    review.images.map((img: any, i: any) => (
                                        <Image
                                            key={i}
                                            src={img.url}
                                            width={50}
                                            height={50}
                                            alt={img.url}
                                        />
                                    ))}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="">pagiantion</div>
        </div>
    );
};

export default Table;
