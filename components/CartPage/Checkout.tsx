const Checkout = ({ subtotal, shippingFee, total, selected, saveCartToDbHandler }: any) => {
    return (
        <div className="flex flex-col h-fit bg-white rounded py-2 px-4 border">

            <h3 className="text-2xl my-2 font-semibold">order Summary</h3>
            <div className="my-1 flex items-center justify-between text-salte-600 text-sm">
                <span>Subtotal</span>
                <span>{subtotal}</span>
            </div>

            <div className="my-1 flex items-center justify-between text-salte-600 text-sm">
                <span>Shipping</span>
                <span className={`${shippingFee == 0 ? "text-blue-500" : ""}`}>{shippingFee == 0 ? `Free Shipping` : `+${shippingFee}$`}</span>
            </div>

            <div className="my-4 w-full bg-slate-200 h-[1px]" />
            <div className="my-1 flex items-center justify-between text-salte-600 font-semibold">
                <span>Total</span>
                <span>USD{total}$</span>
            </div>

            <button onClick={() => saveCartToDbHandler()} disabled={selected.length == 0} className={`${selected.length == 0 ? "bg-slate-300 text-slate-500 cursor-not-allowed" : "cursor-pointer bg-amazon-orange text-amazon-blue_dark font-semibold bg-gradient-to-r from-amazon-orange to-yellow-300 text-amazon-blue_dark  hover:text-slate-100 hover:from-amazon-blue_light hover:to-slate-200"} w-full my-6 py-2 px-4  p-2 rounded-full space-x-2`}>
                Continue
            </button>
        </div>
    );
};

export default Checkout;
