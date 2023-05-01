
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CartHeader from "./CartHeader";
import Checkout from "./Checkout";
import PaymentMethods from "./PaymentMethods";
import Product from "./Product";
import { saveCart } from "../../request/user";

const CartPage = ({ cart }: any) => {
    const { data: session } = useSession();
    const router = useRouter();
    const [selected, setSelected] = useState([]);
    const [shippingFee, setShippingFee] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(()=> {
        setShippingFee(selected.reduce((total: any, product: any) => total + Number(product.shipping), 0).toFixed(2));
        setSubTotal(selected.reduce((total: any, product: any) => total + product.price * product.qty, 0).toFixed(2));
        setTotal((selected.reduce((total: any, product: any) => total + product.price * product.qty, 0) + Number(shippingFee)).toFixed(2))
    },[selected]);

    const saveCartToDbHandler = async () => {
        if(session) {
            const res = await saveCart(selected);
            // console.log('cart page > ',res)
            router.push("/checkout");
        } else {
            router.push("/auth/singin");
        }
    }

    return (
        <div className="flex flex-col md:flex-row px-2 py-8 md:px-8 gap-4">
            <div className="md:w-3/4">
                <CartHeader cartItems={cart.cartItems} selected={selected} setSelected={setSelected}/>
                <div className=" bg-white rounded py-2 px-4 border">
                    <h2 className="font-bold text-3xl my-2">Shopping Cart</h2>
                    <div className="w-full bg-slate-200 h-[1px]" />
                    {cart.cartItems.map((product: any, i: any) => (
                        <Product product={product} key={i} selected={selected} setSelected={setSelected} />
                    ))}
                </div>
            </div>
            <div className="md:w-1/4"> 
                <Checkout
                    subtotal={subTotal}
                    shippingFee={shippingFee}
                    total={total}
                    selected={selected}
                    saveCartToDbHandler={saveCartToDbHandler}
                />
                <PaymentMethods />
            </div>
        </div>
    );
};

export default CartPage;
