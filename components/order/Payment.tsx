import { useAppDispatch } from "@/redux/hooks";
import { emptyCart } from "@/redux/slices/CartSlice";
import axios from "axios";
import Image from "next/image";
import { paymentMethods } from "../checkoutPage/payment/paymentMethods";

const Payment = ({ order, setLoading, setOrder }: any) => {
    const dispatch = useAppDispatch();

    const paymentHandler = async () => {
        try {
            setLoading(true);
            setTimeout(async () => {
                const { data } = await axios.put("/api/order/payment", {
                    id: order._id,
                });
                setOrder(data);
                dispatch(emptyCart(data));
                setLoading(false);
            }, 500);

        } catch (error: any) {
            setLoading(false);
            console.log("errr > ", error);
        }
    };

    return (
        <>
            <h3 className=" pb-2 mb-4 border-b border-b-2  text-xl font-semibold">
                Payment
            </h3>
            <div>
                {paymentMethods.map((payment: any) => {
                    if (payment.id == order.paymentMethod) {
                        return (
                            <div
                                key={payment.id}
                                className={`cursor-pointer p-2 my-2 flex items-center rounded-xl ${
                                    order.paymentMethod == payment.id &&
                                    "bg-slate-200"
                                } hover:bg-slate-200 transition`}
                            >
                                <label htmlFor={payment.id} className="">
                                    <input
                                        type="radio"
                                        name="payment"
                                        id={payment.id}
                                        readOnly
                                        defaultChecked={
                                            order.paymentMethod == payment.id
                                        }
                                    />
                                </label>
                                <div className="flex items-center ">
                                    <Image
                                        src={`/../public/assets/images/${payment.id}.png`}
                                        alt={payment.name}
                                        width={40}
                                        height={40}
                                        className="mx-3"
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-semibold">
                                            {payment.name}
                                        </span>
                                        <p className="text-sm text-slate-600">
                                            {payment.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                })}
                <button
                    className=" mt-2 w-full rounded-xl bg-amazon-blue_light text-white p-4 font-semibold text-2xl hover:bg-amazon-blue_dark hover:scale-95 transition"
                    onClick={() => paymentHandler()}
                >
                    Pay
                </button>
            </div>
        </>
    );
};

export default Payment;
