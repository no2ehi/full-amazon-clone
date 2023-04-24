import Image from "next/image";

const Product = ({ cart }: any) => {
    console.log("cart", cart);
    return (
        // <div className="flex flex-col md:flex-row px-2 py-1 md:px-8 gap-4">
            <div >
                <div className="flex items-center justify-between  pb-2 mb-4 border-b border-b-2 ">
                    <h3 className="text-xl font-semibold">Cart</h3>
                    <span className="text-sm text-slate-600">
                        {cart.products.length == 1
                            ? "1 item"
                            : `${cart.products.length} items`}
                    </span>
                </div>
                <div className="grid grid-cols-4 gap-4">

                
                {cart.products.map((product: any) => (
                    <div key={product._id} className="p-1.5 flex md:flex-col outline outline-1 outline-offset-1 outline-slate-300 rounded-md">
                        <div className="relative w-[200px] h-[220px]">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                // width={90}
                                // height={90}
                                className="rounded-md object-contained"
                            />
                        </div>
                        <div className=" w-fit  text-sm flex items-center  space-x-3 pr-5 my-2  bg-slate-100 rounded-full">
                            <Image
                                src={product.color.image}
                                alt={product.name}
                                width={30}
                                height={30}
                                className="rounded-full"
                            />
                            <span>{product.size}</span>
                            <span><b className="text-xs mr-1">X</b>{product.qty}</span>
                        </div>
                        <div className="mb-2 text-xs font-semibold">
                            {product.name.length > 18
                                ? `${product.name.substring(0, 18)}...`
                                : product.name}
                        </div>
                        <div className="text-sm">
                            {(product.price * product.qty).toFixed(2)}$
                        </div>
                    </div>
                ))}
                </div>
                <div className="my-4 border-t pt-2">
                    Subtotal: <span className="font-bold">{cart.cartTotal}$</span>
                </div>
            </div>
        // </div>
    );
};

export default Product;
