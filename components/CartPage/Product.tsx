import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
    HeartIcon,
    MinusIcon,
    PlusIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { updateCart } from "../../redux/slices/CartSlice";

const Product = ({ product }: any) => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state: any) => state.cart.cartItems);

    const updateQty = (type: any) => {
        let newCart = cart.map((p: any) => {
            if (p._uid == product._uid) {
                return {
                    ...p,
                    qty: type == "plus" ? product.qty + 1 : product.qty - 1,
                };
            }
            return p;
        });
        dispatch(updateCart(newCart));
    };

    const removeItemCart = (id: any) => {
        let newCart = cart.filter((p: any) => p._uid != id);
        dispatch(updateCart(newCart));
    };

    return (
        <div className="mt-2 grid grid-cols-3  max-md:grid-rows-1 md:grid-cols-6  border-b p-2 pb-4 last:border-none ">
            <div className="flex flex-col-reverse md:flex-row md:items-center">
                <input
                    type="checkbox"
                    name="product"
                    className="w-5 h-5 cursor-pointer hidden md:block"
                />
                <Image
                    src={product.images[0].url}
                    width={100}
                    height={100}
                    className="md:ml-4 object-contained rounded-md outline outline-1 outline-offset-2 outline-slate-300"
                    alt={product.name}
                />
            </div>
            <div className="col-span-2  md:col-span-4 md:ml-2">
                <Link href="" target="_blank" className="text-sm font-semibold">
                    {product.name}
                </Link>
                <div className="my-2 w-48 flex items-center space-x-3 px-3 py-2 bg-slate-100 rounded-full">
                    <div className="relative w-10 h-10">
                        <Image
                            src={product.color.image}
                            fill
                            className="object-contained rounded-full outline outline-1 outline-offset-2 outline-slate-400"
                            alt={product.name}
                        />
                    </div>
                    <span>{product.size}</span>
                    <span>{product.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center">
                    <span className="font-bold text-xl">
                        USD{(product.price * product.qty).toFixed(2)} $
                    </span>
                    <span className="ml-2 text-sm line-through text-slate-400">
                        USD{(product.priceBefore * product.qty).toFixed(2)} $
                    </span>
                </div>
                <span className="text-blue-500 text-sm">
                    {product.shipping == 0
                        ? "Free Shipping"
                        : `+${product.shipping}$ shipping fee`}
                </span>
            </div>
            <div className="max-md:col-span-3 max-md:items-center max-md:mt-2 max-md:justify-between flex md:mt-4  md:flex-col md:items-end md:justify-center">
                <div className="flex items-center space-x-4">
                    <input
                        type="checkbox"
                        name="product"
                        className="w-5 h-5 cursor-pointer  md:hidden"
                    />
                    <HeartIcon className="w-6 h-6 cursor-pointer" />
                    <TrashIcon
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => removeItemCart(product._uid)}
                    />
                </div>
                <div className="md:mt-4  flex items-center space-x-2">
                    <button
                        disabled={product.qty < 2}
                        className="bg-slate-200 p-1.5 rounded-full hover:bg-slate-300"
                        onClick={() => updateQty("minus")}
                    >
                        <MinusIcon className="w-4 h-4  text-slate-800" />
                    </button>
                    <span className="text-m text-slate-900">{product.qty}</span>
                    <button
                        disabled={product.qty == product.quantity}
                        className="bg-slate-200 p-1.5 rounded-full hover:bg-slate-300"
                        onClick={() => updateQty("plus")}
                    >
                        <PlusIcon className="w-4 h-4  text-slate-900" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;
