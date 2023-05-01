import { getSession } from "next-auth/react";

import User from "@/models/User";
import Cart from "@/models/Cart";
import db from "@/utils/db";
import { useEffect, useState } from "react";

import Header from "@/components/Header/Header";
import MenuSideBar from "@/components/Header/MenuSidebar";
import ShippingPage from "@/components/checkoutPage/ShippingPage";
import Product from "@/components/checkoutPage/product/Product";
import Payment from "@/components/checkoutPage/payment/Payment";
import Summary from "@/components/checkoutPage/Summary/Summary";

const Checkout = ({ cart, user }: any) => {
    const [addresses, setAddresses] = useState(user?.address || []);
    const [paymentMethod, setPaymentMethod] = useState("paypal");
    const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
    const [selectedAddress, setSelectedAddress] = useState("");
    useEffect(() => {
        let check = addresses.find((address: any) => address.active == true);
        if(check) {

            setSelectedAddress(check)
        } else {
            setSelectedAddress("")
        }
    },[addresses])

    return (
        <>
            <Header />
            <main className="grid grid-cols-3 md:px-10 mb-10 py-4 gap-8 ">
                <section className="col-span-2">
                    <ShippingPage
                        user={user}
                        addresses={addresses}
                        setAddresses={setAddresses}
                        setSelectedAddress={setSelectedAddress}
                    />
                    <Product cart={cart} />
                </section>

                <section className="col-span-1">
                    <Payment
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                    />
                    <Summary selectedAddress={selectedAddress}  user={user} cart={cart} paymentMethod={paymentMethod} totalAfterDiscount={totalAfterDiscount} setTotalAfterDiscount={setTotalAfterDiscount} />
                </section>
            </main>
            <MenuSideBar />
        </>
    );
};

export default Checkout;

export async function getServerSideProps(context: any) {
    db.connectDb();
    const session = await getSession(context);
    const user = await User.findById(session?.user?.id);
    const cart = await Cart.findOne({ user: user?._id });
    db.disconnectDb();
    // console.log("session > ", session, "user > ", user, "cart > ", cart);
    if (!cart) {
        return {
            redirect: {
                destination: "/cart",
            },
        };
    }

    return {
        props: {
            cart: JSON.parse(JSON.stringify(cart)),
            user: JSON.parse(JSON.stringify(user)),
        },
    };
}
