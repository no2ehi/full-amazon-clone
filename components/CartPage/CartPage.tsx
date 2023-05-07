import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CartHeader from "./CartHeader";
import Checkout from "./Checkout";
import PaymentMethods from "./PaymentMethods";
import Product from "./Product";
import { saveCart } from "../../request/users";
import axios from "axios";
import { useAppDispatch } from "@/redux/hooks";
import { updateCart } from "@/redux/slices/CartSlice";
import DotLoaderSpinner from "../loaders/dotLoader/DotLoaderSpinner";

const CartPage = ({ cart }: any) => {
    const { data: session } = useSession();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [selected, setSelected] = useState([]);
    const [shippingFee, setShippingFee] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (session) {
            const update = async () => {
                const { data } = await axios.post(`/api/user/updatecart`, {
                    products: cart.cartItems,
                });
                dispatch(updateCart(data));
                console.log("update cart > ", data);
            };
            if (cart.cartItems.length > 0) {
                update();
            }
        } else {
            router.push("/auth/signin");
        }
    }, []);

    useEffect(() => {
        setShippingFee(
            selected
                .reduce(
                    (total: any, product: any) =>
                        total + Number(product.shipping),
                    0
                )
                .toFixed(2)
        );
        setSubTotal(
            selected
                .reduce(
                    (total: any, product: any) =>
                        total + product.price * product.qty,
                    0
                )
                .toFixed(2)
        );
        setTotal(
            (
                selected.reduce(
                    (total: any, product: any) =>
                        total + product.price * product.qty,
                    0
                ) + Number(shippingFee)
            ).toFixed(2)
        );
    }, [selected]);

    const saveCartToDbHandler = async () => {
        if (session) {
            setLoading(true);
            const res = await saveCart(selected);
            router.push("/checkout");
            setLoading(false);
        } else {
            router.push("/auth/signin");
        }
    };

    return (
        <>
            {loading && <DotLoaderSpinner loading={loading} />}
            <div className="flex flex-col md:flex-row px-2 py-8 md:px-8 gap-4">
                <div className="md:w-3/4">
                    <CartHeader
                        cartItems={cart.cartItems}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <div className=" bg-white rounded py-2 px-4 border">
                        <h2 className="font-bold text-3xl my-2">
                            Shopping Cart
                        </h2>
                        <div className="w-full bg-slate-200 h-[1px]" />
                        {cart.cartItems.map((product: any, i: any) => (
                            <Product
                                product={product}
                                key={i}
                                selected={selected}
                                setSelected={setSelected}
                                cart={cart}
                            />
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
        </>
    );
};

export default CartPage;
