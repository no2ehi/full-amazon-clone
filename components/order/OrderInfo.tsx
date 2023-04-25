import {
    CheckBadgeIcon,
    ChevronRightIcon,
    XCircleIcon,
} from "@heroicons/react/24/solid";

const OrderInfo = ({ order }: any) => {
    return (
        <div className="border-b pb-4 mb-2">
            <div className="flex items-center text-sm text-slate-600">
                <span>Home</span>
                <ChevronRightIcon className="w-4 mx-2 h-4" />
                <span>Orders</span>
                <ChevronRightIcon className="w-4 mx-2 h-4" />
                <span>{order._id}</span>
            </div>

            <div className="mt-3 flex items-center">
                <span className="font-semibold mr-2">Payment Status: </span>
                {order.isPaid == "Completed" ? (
                    <CheckBadgeIcon className="w-8 h-8 fill-green-500" />
                ) :  (
                    <XCircleIcon className="w-8 h-8 fill-red-500" />
                )}
            </div>
            <div className="mt-2 flex items-center">
                <span className="font-semibold mr-2">Order Status: </span>
                <span
                    className={`${
                        order.status == "Completed"
                            ? "text-green-600"
                            : "text-red-600"
                    }`}
                >
                    {order.status}
                </span>
            </div>
        </div>
    );
};

export default OrderInfo;
