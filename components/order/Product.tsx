import Image from "next/image";
import Link from "next/link";

const Product = ({ product }: any) => {
    return (
        <div className="mt-2 grid grid-cols-3  max-md:grid-rows-1 md:grid-cols-6  border-b p-2 pb-4  ">
            <div className="flex flex-col-reverse md:flex-row md:items-center">
                <Image
                    src={product.image}
                    width={100}
                    height={100}
                    className="md:ml-4 object-contained rounded-md outline outline-1 outline-offset-2 outline-slate-300"
                    alt={product.name}
                />
            </div>
            <div className="col-span-4  md:col-span-5 ml-4 md:ml-0">
                <Link href="" target="_blank" className="text-sm font-semibold">
                    {product.name}
                </Link>
                <div className="my-2 w-fit  flex items-center space-x-3 px-3 py-2 bg-slate-100 rounded-full">
                    <div className="relative w-10 h-10">
                        <Image
                            src={product.color.image}
                            fill
                            className="object-contained rounded-full outline outline-1 outline-offset-2 outline-slate-400"
                            alt={product.name}
                        />
                    </div>
                    <span>{product.size}</span>
                </div>
                <div className="flex md:flex-row">
                    <span className="font-semibold ">
                        {product.price.toFixed(2)}$
                    </span>
                    <span className="mx-2">x</span>
                    <span className="font-semibold ">
                        {product.qty}
                    </span>
                </div>
                <div className="flex justify-end md:flex-row">
                    <span className="font-bold ">
                        {(product.price * product.qty).toFixed(2)} $
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Product;
