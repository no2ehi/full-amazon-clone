import Image from "next/image";

const UserInfo = ({ order }: any) => {
    return (
        <div className=" mb-2">
            <h3 className="text-2xl font-bold border-b pb-3 mb-3">
                Customer's Order
            </h3>

            <div className="flex items-center space-x-3">
                <Image
                    src={order.user.image}
                    alt={order.user.name}
                    width={65}
                    height={65}
                    className="rounded-full"
                />
                <div className="flex flex-col text-slate-800">
                    <span className="font-semibold">{order.user.name}</span>
                    <span>{order.user.email}</span>
                </div>
            </div>
            <div className="mt-2 flex flex-col text-slate-800">
                <h4 className="text-xl font-bold border-b pb-2 mb-2">
                    Shipping Address
                </h4>
                <span>
                    {order.shippingAddress.firstName}{" "}
                    {order.shippingAddress.lastName}
                </span>
                <span>
                    {order.shippingAddress.city}/{order.shippingAddress.state}/
                    {order.shippingAddress.country}
                </span>
                <span>{order.shippingAddress.address1}</span>
                <span>{order.shippingAddress.address2}</span>
                <span>{order.shippingAddress.zipCode}</span>
                <span>{order.shippingAddress.phoneNumber}</span>
            </div>
            <div className="mt-2 flex flex-col text-slate-800">
                <h4 className="text-xl font-bold border-b pb-2 mb-2">
                    Billing Address
                </h4>
                <span>
                    {order.shippingAddress.firstName}{" "}
                    {order.shippingAddress.lastName}
                </span>
                <span>
                    {order.shippingAddress.city}/{order.shippingAddress.state}/
                    {order.shippingAddress.country}
                </span>
                <span>{order.shippingAddress.address1}</span>
                <span>{order.shippingAddress.address2}</span>
                <span>{order.shippingAddress.zipCode}</span>
                <span>{order.shippingAddress.phoneNumber}</span>
            </div>
        </div>
    );
};

export default UserInfo;
