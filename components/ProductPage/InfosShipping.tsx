import { LockClosedIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, StarIcon } from "@heroicons/react/24/solid";

const InfosShipping = ({ product }: any) => {
    return (
        <div className="rounded-lg border border-gray-300 p-3 flex flex-col row-span-2 md:col-span-2">
            <div className="mb-3 font-semibold">${product.price}</div>

            <div className="text-slate-600 text-sm">
                <p>No Import Fees Deposit</p>
                <div className="flex">
                    <p className="my-1 text-blue-500">
                        {product.shippin
                            ? `+${product.shipping}$ Shipping Fee`
                            : "Free Shipping"}
                    </p>
                    <div className="ml-2 flex items-center text-blue-500 cursor-pointer hover:text-amazon-orange">
                        Details
                        <ChevronDownIcon className="w-4 h-4 ml-1" />
                    </div>
                </div>
            </div>

            <div>
                <p>
                    Delivery <b>Thursday, March 23</b>. Order within{" "}
                    <span className="text-green-500">23 hrs 53 mins</span>
                </p>
            </div>

            <div className="flex items-center my-2">
                <MapPinIcon className="w-4 h-4 mr-1" />
                <p className="text-sm text-blue-500 cursor-pointer hover:text-amazon-orange">
                    Deliver to Germany
                </p>
            </div>

            <div className="my-2">
                <p className="font-md font-semibold text-green-700">
                    {product.quantity > 1 ? "In Stock" : "Sold"}
                </p>
            </div>

            <button className="py-2 px-4 bg-amazon-orange text-black rounded-full shadow">
                Add to Cart
            </button>

            <div className="flex items-center mt-4 cursor-pointer">
                <LockClosedIcon className="h-4 mr-1" />
                <p className="text-blue-600 hover:text-amazon-orange">
                    Secure transaction
                </p>
            </div>

            <table className="my-4 text-sm whitespace-nowrap grid">
                <tbody>
                    <tr className="grid grid-cols-3">
                        <td className="text-slate-500">Ships from</td>
                        <td className="col-span-2">Amazon</td>
                    </tr>
                    <tr className="grid grid-cols-3">
                        <td className="text-slate-500">Sold by</td>
                        <td className="col-span-2">ATUAT</td>
                    </tr>
                    <tr className="grid grid-cols-3">
                        <td className="text-slate-500">Returns</td>
                        <td className="col-span-2 truncate">
                            Eligible for Return, Refund or Replacement within 30
                            days of receipt
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="flex w-full bg-slate-200 h-0.5" />

            <div>add to list</div>
        </div>
    );
};

export default InfosShipping;
