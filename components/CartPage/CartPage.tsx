const CartPage = () => {
    return ( 
        <div className="grid grid-row-7 md:grid-cols-7 gap-4 px-2 md:px-4 py-4">
            <div className="col-span-5 bg-white rounded py-2 px-4 border">
                <h2 className="font-bold text-3xl my-2">Shopping Cart</h2>

                <div className="w-full bg-slate-200 h-0.5" />


            </div>

            <div className="col-span-2 bg-white rounded py-2 px-4 border">
                <h3 className="text-xl my-2 font-semibold">Subtotal (1 item): $ 2</h3>

                <div>
                    <button className="w-full my-4 py-2 px-4 bg-amazon-orange text-black rounded-full shadow">Add to Cart</button>
                </div>
                
            </div>
        </div>
     );
}
 
export default CartPage;