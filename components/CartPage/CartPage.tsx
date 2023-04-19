import { useAppSelector } from "@/redux/hooks";
import Product from "./Product";

const CartPage = ({ cart }: any) => {
    let totalPrice = Number(cart.cartItems.reduce((total: any, product: any) =>  total + (product.price * product.qty) ,0)).toFixed(2);
    return (
        <div className="grid grid-row-7 md:grid-cols-7 gap-4 px-2 md:px-4 py-4">
            <div className="md:col-span-5 bg-white rounded py-2 px-4 border">
                <h2 className="font-bold text-3xl my-2">Shopping Cart</h2>
                <div className="w-full bg-slate-200 h-[1px]" />
                {cart.cartItems.map((product: any, i: any) => (
                    <Product product={product} key={i} />
                ))}
            </div>

            <div className="md:col-span-2 bg-white rounded py-2 px-4 border">
                <h3 className="text-xl my-2 font-semibold">
                    Subtotal ({cart.cartItems.length} item): {totalPrice}$
                </h3>
                <div>
                    <button className="w-full my-4 py-2 px-4 bg-amazon-orange text-black rounded-full shadow">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
