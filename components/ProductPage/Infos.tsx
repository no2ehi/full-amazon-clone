import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import {
    HeartIcon,
    MinusIcon,
    PlusIcon,
    ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import Share from "./Share";
import AccoridanProduct from "./AccoridanProduct";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, updateCart } from "../../redux/slices/CartSlice";

const Infos = ({ product, setActiveImg }: any) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [size, setSize] = useState(router.query.size);
    const [qty, setQty] = useState(1);
    const [error, setError] = useState("");
    const { cartItems: cart } = useAppSelector((state: any) => state.cart);
    console.log("cart: ", cart);
    useEffect(() => {
        setSize("");
        setQty(1);
    }, [router.query.style]);

    useEffect(() => {
        if (qty > product.quantity) {
            setQty(product.quantity);
        }
    }, [router.query.size]);

    const addToCartHandler = async () => {
        if (!router.query.size) {
            setError("Please Select a size");
            return;
        }
        const { data } = await axios.get(
            `/api/product/${product._id}?style=${product.style}&size=${router.query.size}`
        );

        if (qty > data.quantity) {
            setError(
                "the Quantity you have choosed is more than in stock. Try lower the Qty"
            );
        } else if (data.quantity < 1) {
            setError("this Product is out of stock!");
            return;
        } else {
            let _uid = `${product._id}_${product.style}_${router.query.size}`;
            let exist = cart.find((p: any) => p._uid === _uid);
            if (exist) {
                let newCart = cart.map((p: any) => {
                    if(p._uid == exist._uid) {
                        return {...p, qty: qty}
                    }
                    return p;
                });
                dispatch(updateCart(newCart));
                setError("");
            } else {
                dispatch(addToCart({ ...data, qty, size: data.size, _uid }));
                setError("");
            }
        }
    };

    return (
        <div className="flex flex-col row-span-3 md:col-span-3 max-md:px-2 mb-4">
            <h1 className="text-2xl font-bold ">{product.name}</h1>
            <div className="flex items-center ">
                <span className="cursor-pointer uppercase hover:underline text-sm mr-3 text-slate-600">
                    {product.brand}
                </span>
                <Rating
                    name="half-rating-read"
                    defaultValue={product.rating}
                    precision={0.5}
                    readOnly
                    style={{ color: "#FACF19" }}
                />
                <span className="text-slate-500">
                    ({product.numberReviews}{" "}
                    {product.numberReviews >= 1 ? "reviews" : "review"})
                </span>
            </div>
            <div className="flex w-full bg-slate-200 h-[1px]" />

            <div className="mt-2 flex items-center">
                <div className="text-4xl font-semibold text-red-500">
                    {!size ? `${product.priceRange}` : `${product.price}$`}
                </div>

                {product.discount > 0 ? (
                    <div className="ml-2  text-slate-400">
                        {size && (
                            <span className=" text-xl line-through">
                                {product.priceBefore}
                            </span>
                        )}
                        <span className="ml-1 text-blue-500">
                            (-{product.discount}%)
                        </span>
                    </div>
                ) : (
                    ""
                )}
            </div>

            <div className="mt-1  text-sm text-slate-500">
                {size
                    ? product.quantity
                    : product.sizes.reduce(
                          (start: any, next: any) => start + next.qty,
                          0
                      )}{" "}
                pieces Available
            </div>

            <p className=" mt-3  text-sm">{product.description}</p>

            <div className="mt-3 ">
                <h4 className="font-semibold text-slate-700">Select a Size:</h4>
                <div className="mt-2 flex gap-3 ">
                    {product.sizes.map((size: any, i: any) => (
                        <Link
                            key={i}
                            href={`/product/${product.slug}?style=${router.query.style}&size=${i}`}
                        >
                            <div
                                onClick={() => setSize(size.size)}
                                className={`flex items-center justify-center w-11 h-11 rounded-full bg-slate-200 text-slate-700 hover:outline hover:outline-1 hover:outline-slate-400 hover:outline-offset-[3px] transition-all transition  ${
                                    i == router.query.size &&
                                    "font-semibold outline outline-1 outline-slate-400 outline-offset-[3px] bg-gradient-to-r from-amazon-orange to-slate-100"
                                }`}
                            >
                                {size.size}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="mt-2 ">
                <h4 className="font-semibold text-slate-700">
                    Select a Color:
                </h4>
                <div className="mt-2 flex gap-3">
                    {product.colors &&
                        product.colors.map((color: any, i: any) => (
                            <span
                                key={i}
                                className={`rounded-full w-11 h-11 hover:outline outline-1 hover:outline-offset-[3px] hover:outline-slate-400  transition-all transition ${
                                    i == router.query.style
                                        ? "outline outline-1 outline-offset-[3px] outline-slate-400"
                                        : ""
                                }`}
                                onMouseOver={() =>
                                    setActiveImg(
                                        product.subProducts[i].images[0].url
                                    )
                                }
                                onMouseLeave={() => setActiveImg("")}
                            >
                                <Link
                                    href={`/product/${product.slug}/?style=${i}`}
                                >
                                    <Image
                                        className="rounded-full object-cover h-11"
                                        width={44}
                                        height={44}
                                        src={color.image}
                                        alt={color.color}
                                    />
                                </Link>
                            </span>
                        ))}
                </div>
            </div>

            <div className="mt-6  flex items-center space-x-2">
                <button
                    className="bg-slate-200 p-1.5 rounded-full hover:bg-slate-300"
                    onClick={() => qty > 1 && setQty((prev) => prev - 1)}
                >
                    <MinusIcon className="w-4 h-4  text-slate-800" />
                </button>
                <span className="text-m text-slate-900">{qty}</span>
                <button
                    className="bg-slate-200 p-1.5 rounded-full hover:bg-slate-300"
                    onClick={() =>
                        qty < product.quantity && setQty((prev) => prev + 1)
                    }
                >
                    <PlusIcon className="w-4 h-4  text-slate-900" />
                </button>
            </div>

            <div className="mt-2 flex flex-col md:flex-row md:space-x-3">
                <button
                    className={`flex flex-grow items-center justify-center bg-gradient-to-r from-amazon-orange to-yellow-300 text-amazon-blue_dark  p-2 rounded-full space-x-2 hover:text-slate-100 hover:from-amazon-blue_light hover:to-slate-500 hover:shadow-md transition duration-300 ${
                        product.quantity < 1 ? "cursor-not-allowed" : ""
                    }`}
                    disabled={product.quantity < 1}
                    onClick={() => addToCartHandler()}
                >
                    <ShoppingBagIcon className="w-8 h-8" />
                    <span className="font-semibold text-xl">ADD TO CART</span>
                </button>
                {error && (
                    <span className="mt-2 text-red-500 font-semibold">
                        {error}
                    </span>
                )}
                <button className="flex items-center bg-slate-200 text-amazon-blue_light p-2 rounded space-x-2 hover:bg-amazon-blue_light hover:text-slate-100 transition duration-500 ease-in-out max-md:mt-3">
                    <HeartIcon className="w-8 h-8" />
                    <span>WishList</span>
                </button>
            </div>

            {/* <div className="mt-4">
                <Share />
            </div> */}

            <div className="mt-4">
                <AccoridanProduct
                    details={product.details}
                    questions={product.questions}
                />
            </div>
        </div>
    );
};

export default Infos;
