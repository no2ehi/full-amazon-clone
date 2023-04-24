import { getSession } from "next-auth/react";

import User from "@/models/User";
import Cart from "@/models/Cart";
import db from "@/utils/db";
import { useEffect, useState } from "react";

import Header from "@/components/Header/Header";
import MenuSideBar from "@/components/Header/MenuSidebar";
import ShippingPage from "@/components/checkoutPage/ShippingPage";

const checkout = ({ cart, user }: any) => {
    const [addresses, setAddresses] = useState(user?.address || []);

    return (
        <>
            <Header />
            <main className="w-full h-screen">
                <ShippingPage
                    user={user}
                    addresses={addresses}
                    setAddresses={setAddresses}
                />
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
