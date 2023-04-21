import { getSession } from "next-auth/react";

import User from "@/models/User";
import Cart from "@/models/Cart";
import db from "@/utils/db";
import { useState } from "react";

import Header from "@/components/Header/Header";
import MenuSideBar from "@/components/Header/MenuSidebar";
import ShippingPage from "@/components/checkoutPage/ShippingPage";


const checkout = ({ cart, user }: any) => {
    const [selectedAddress, setSelectedAddress] = useState("")
    return (
        <>
            <Header />
            <main className="w-full h-screen">
                <ShippingPage user={user} selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />
            </main>
            <MenuSideBar />
        </>
    );
};

export default checkout;

export async function getServerSideProps(context: any) {
    db.connectDb();
    const session = await getSession(context);
    const user = await User.findById(session?.user?.id);
    const cart = await Cart.findOne({ user: user?._id });
    db.disconnectDb();
    console.log("session > ", session, "user > ", user, "cart > ", cart);
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
