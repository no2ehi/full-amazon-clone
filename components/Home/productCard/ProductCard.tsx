import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductSwiper from "./ProductSwiper";

const ProductCard = ({ product }: any) => {
    const [active, setActive] = useState(0);
    const [images, setImages] = useState(product.subProducts[active]?.images);
    const [prices, setPrices] = useState(
        product.subProducts[active]?.sizes
            .map((s: any) => s.price)
            .sort((a: any, b: any) => a - b)
    );
    const [styles, setStyles] = useState(
        product.subProducts.map((p: any) => p.color)
    );

    useEffect(() => {
        setImages(product.subProducts[active]?.images);
        setPrices(
            product.subProducts[active]?.sizes
                .map((s: any) => s.price)
                .sort((a: any, b: any) => a - b)
        );
    }, [active]);

    return (
        <div className="flex flex-col relative w-[215px] rounded ">
            <Link href={`/product/${product.slug}?style=${active}${`${product.subProducts[active].sizes.length > 1 ? '&size='+ active : ''}`}`}>
                <ProductSwiper images={images} />
            </Link>
            {product.subProducts[active].discount > 0 && (
                <div className=" flex items-center justify-center absolute bg-yellow-400 w-9 h-9 rounded-full -top-2 -right-2 z-10 text-sm">
                    -{product.subProducts[active].discount}%
                </div>
            )}
            <div className=" mt-2">
                <Link href={`/product/${product.slug}?style=${active}`}>
                    <h3>
                        {product.name.length > 45
                            ? `${product.name.substring(0, 45)}`
                            : product.name}
                    </h3>
                </Link>
                <span className="text-xs text-red-500">
                    {prices.length === 1
                        ? `USD${prices[0]}$`
                        : `USD${prices[0]} - ${prices[prices.length - 1]}$`}
                </span>
                <div className="flex space-x-2 mt-1">
                    {styles &&
                        styles.map((style: any, i: number) =>
                            style.image ? (
                                <Image
                                    key={i}
                                    src={style.image}
                                    className={`cursor-pointer h-[25px] object-cover rounded-full hover:outline hover:outline-black active:outline active:outline-black outline-1 outline-offset-2 ${
                                        i === active
                                            ? "outline outline-black"
                                            : ""
                                    }`}
                                    width={25}
                                    height={25}
                                    onMouseOver={() => {
                                        setImages(
                                            product.subProducts[i].images
                                        );
                                        setActive(i);
                                    }}
                                    alt={product.name}
                                />
                            ) : (
                                <span
                                    key={i}
                                    className={`cursor-pointer w-[25px] h-[25px] rounded-full hover:outline hover:outline-black active:outline active:outline-black outline-1 outline-offset-2 ${
                                        i === active
                                            ? "outline outline-black"
                                            : ""
                                    }`}
                                    style={{
                                        backgroundColor: `${style.color}`,
                                    }}
                                    onMouseOver={() => {
                                        setImages(
                                            product.subProducts[i].images
                                        );
                                        setActive(i);
                                    }}
                                ></span>
                            )
                        )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
