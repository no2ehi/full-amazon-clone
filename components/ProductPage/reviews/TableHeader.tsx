import { useState } from "react";
import TableSelect from "./TableSelect";

const TableHeader = ({ reviews, allSizes, colors }: any) => {
    const [size, setSize] = useState("");
    const [style, setStyle] = useState("");
    const [fit, setFit] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("");
    const [order, setOrder] = useState("");

    return (
        <div className="max-md:flex ">
            <div className="flex flex-wrap justify-end my-2">
                <TableSelect
                    property={rating}
                    text="rating"
                    data={ratings.filter((item: any) => item.value !== rating)}
                    handleChange={setRating}
                />
                <TableSelect
                    property={size}
                    text="size"
                    data={allSizes.filter((item: any) => item.size !== size)}
                    handleChange={setSize}
                />
                <TableSelect
                    property={style}
                    text="style"
                    data={colors.filter((item: any) => item !== style)}
                    handleChange={setStyle}
                />
                <TableSelect
                    property={order}
                    text="order"
                    data={orderOptions.filter(
                        (item: any) => item.value !== order
                    )}
                    handleChange={setOrder}
                />
            </div>
            <div className="md:hidden w-full"></div>
        </div>
    );
};

export default TableHeader;

const ratings = [
    {
        text: "All",
        value: "",
    },
    {
        text: "5 Star",
        value: 5,
    },
    {
        text: "4 Star",
        value: 4,
    },
    {
        text: "3 Star",
        value: 3,
    },
    {
        text: "2 Star",
        value: 2,
    },
    {
        text: "1 Star",
        value: 1,
    },
];

const orderOptions = [
    {
        text: "All",
        value: "All",
    },
    {
        text: "Recomended",
        value: "Recomended",
    },
    {
        text: "Most Recent to Oldest",
        value: "Most Recent to Oldest",
    },
    {
        text: "Oldest to Most Recent",
        value: "Oldest to Most Recent",
    },
];
