const Total = ({ order }: any) => {
    return (
        <div className="mt-4 space-y-2 ">
            <div className="flex items-center  justify-between font-semibold text-slate-800">
                <span>Subtotal: </span>
                <span>{order.totalBeforeDiscount}$</span>
            </div>
            {order.couponApplied && (
                <div className="flex items-center justify-between font-semibold text-slate-800">
                    <span>
                        Coupon Applied:{" "}
                        <em className="text-green-600">
                            ({order.couponApplied})
                        </em>
                    </span>
                    <span>
                        - {order.totalBeforeDiscount - order.tatol}$
                    </span>
                </div>
            )}
            <div className="flex items-center justify-between font-semibold text-slate-800">
                <span>Tax Price: </span>
                {order.tax ? (<span>+ {order.taxPrice}$</span>) : (<span>Free</span>)}
            </div>
            <div className="flex items-center justify-between font-bold text-slate-800 border-t pt-2">
                <span>TOTAL TO PAY:{"  "}</span>
                <span> {order.total}$</span>
            </div>
        </div>
    );
};

export default Total;
