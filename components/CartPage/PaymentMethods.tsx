import Image from "next/image";
import paymentMethods from "../../public/assets/images/payment_methods.png";
import buyerProtection from "../../public/assets/images/buyer_protection.png";
const PaymentMethods = () => {
    return (
        <div className="mt-4  flex flex-col flex-grow h-fit bg-white rounded py-2 px-4 border">
            <h3 className="text-2xl my-2 font-semibold">Payment Methods</h3>
            <Image
                src={paymentMethods}
                alt="payment methods"
                width={220}
                height={25}
            />
            <div className="my-4 w-full bg-slate-200 h-[1px]" />

            <div className="flex items-center space-x-1">
                <Image
                    src={buyerProtection}
                    alt="payment methods"
                    width={25}
                    height={25}
                />
                <h5 className="text-xs font-semibold">Buyer Protection</h5>
            </div>
            <p className="text-sm">
                {`Get full refund if the item is not ans described or if it's
                    not delivered.`}
            </p>
        </div>
    );
};

export default PaymentMethods;
