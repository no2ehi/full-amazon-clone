import PaymentCheckout from "@/components/checkoutPage/payment/Payment";
import Layout from "@/components/profile/layout/Layout";
import User from "@/models/User";
import db from "@/utils/db";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useState } from "react";

const Payment = ({ user, tab, defaultPaymentMethod }: any) => {
    const [dbPM, setDbPM] = useState(defaultPaymentMethod);
    const [paymentMethod, setPaymentMethod] = useState(defaultPaymentMethod);
    const [error, setErorr] = useState("");

    const handlePM = async () => {
        try {
            const { data } = await axios.put("/api/user/changepm", {
                paymentMethod: paymentMethod,
            });
            setErorr("");
            setDbPM(data.paymentMethod);
            window.location.reload();
        } catch (error: any) {
            setErorr(error.response.data.message);
        }
    };

    return (
        <>
            <Layout
                user={user.user}
                tab={tab}
                title={`${user.user.name}'s Address`}
            >
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        My Payment Methods
                    </h2>
                </div>
                <PaymentCheckout
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    profile={true}
                />
                <button
                    disabled={!paymentMethod || paymentMethod == dbPM}
                    className={`mt-4 w-52 rounded-xl  text-white p-4 font-semibold text-2xl  ${
                        !paymentMethod || paymentMethod == dbPM
                            ? "cursor-not-allowed bg-slate-400"
                            : "cursor-pointer  bg-amazon-blue_light hover:bg-amazon-blue_dark hover:scale-95 transition"
                    }`}
                    onClick={() => handlePM()}
                >
                    Save
                </button>
                {error && <span className="text-red-500">{error}</span>}
            </Layout>
        </>
    );
};

export default Payment;

export async function getServerSideProps(context: any) {
    db.connectDb();
    const { query } = context;
    const session = await getSession(context);
    const tab = query.tab || 0;

    if (!session) {
        return {
            redirect: {
                destination: "/",
            },
        };
    }
    const user = await User.findById(session.user?.id).select(
        "defaultPaymentMethod"
    );
    return {
        props: {
            user: session,
            tab,
            defaultPaymentMethod: user.defaultPaymentMethod,
        },
    };
}
