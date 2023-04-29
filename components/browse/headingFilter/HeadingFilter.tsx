import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Rating, Tooltip } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const HeadingFilter = () => {
    const [show, setShow] = useState(false);
    return (
        <div className="w-full flex items-center gap-x-6">
            <div>
                <span className="mr-2">Price:</span>
                <input
                    className="mx-1 w-20 rounded border py-1.5 px-2 outline-none"
                    type="number"
                    placeholder="min"
                    min="0"
                />
                <input
                    className="mx-1 w-20 rounded border py-1.5 px-2 outline-none"
                    type="number"
                    placeholder="max"
                    max="0"
                />
            </div>

            <div>
            <Tooltip
                title={<h2>Check out products under 10$</h2>}
                placeholder="top"
                arrow  
            >
                <button className="tooltip_btn">
                    <span style={{ height: "15%" }}></span>
                </button>
            </Tooltip>
            <Tooltip
                title={<h2>Check out products between 10$ and 50$</h2>}
                placeholder="top"
                arrow
            >
                <button className="tooltip_btn">
                    <span
                        style={{ height: "30%" }}
                    ></span>
                </button>
            </Tooltip>
            <Tooltip
                title={<h2>Check out products between 50$ and 100$</h2>}
                placeholder="top"
                arrow
            >
                <button className="tooltip_btn">
                    <span
                        style={{ height: "50%" }}
                    ></span>
                </button>
            </Tooltip>
            <Tooltip
                title={<h2>Check out products between 100$ and 500$</h2>}
                placeholder="top"
                arrow
            >
                <button className="tooltip_btn">
                    <span
                        style={{ height: "75%" }}
                    ></span>
                </button>
            </Tooltip>
            <Tooltip
                title={<h2>Check out products for more than 500$</h2>}
                placeholder="top"
                arrow
            >
                <button className="tooltip_btn">
                    <span
                        style={{ height: "100%" }}
                    ></span>
                </button>
            </Tooltip>
            </div>

            <div>
                <input type="checkbox" name="shipping" id="shipping" />
                <label htmlFor="shipping" className="ml-1">Free Shipping</label>
            </div>

            <div className="flex items-center">
                <input type="checkbox" name="rating" id="rating" />
                <label htmlFor="rating" className="flex items-center">
                    <Rating
                        name="half-rating-react" 
                        defaultValue={5}
                        readOnly
                        style={{ color: "#FACF19 " }}
                        className="text-red-300"
                    />
                    & up
                </label>
            </div>

            <div
                className="dropdown_sortby ml-auto"
                onMouseOver={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
            >
                <span>Sort by:</span>
                <button className="flex items-center ml-1">
                    Recommend <ChevronDownIcon className="w-4 h-4 ml-2" />
                </button>
                {show && (
                    <ul>
                        <li>
                            <Link href="">Recommend</Link>
                        </li>
                        <li>
                            <Link href="">Most Popular</Link>
                        </li>
                        <li>
                            <Link href="">New Arrivals</Link>
                        </li>
                        <li>
                            <Link href="">Top Reviewed</Link>
                        </li>
                        <li>
                            <Link href="">Price (Low to High)</Link>
                        </li>
                        <li>
                            <Link href="">Price (High to Low)</Link>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default HeadingFilter;
