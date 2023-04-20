import { useEffect, useState } from "react";
import { compareArrays } from "../../utils/array_utils";

const CartHeader = ({ cartItems, selected, setSelected }: any) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        const check = compareArrays(cartItems, selected);
        setActive(check);
    },[selected]);

    const handleSelect = () => {
        if(selected.length !== cartItems.length) {
            setSelected(cartItems);
        } else {
            setSelected([])
        }
    }

    return (
        <div className="mb-4 md:col-span-5 bg-white rounded py-2 px-4 border">
            <h2 className="font-bold text-3xl my-2">
                item Summary ({selected.length})
            </h2>
            <div className="w-full bg-slate-200 h-[1px]" />
            <div className="mt-3 flex items-center space-x-3">
                <input
                    type="checkbox"
                    name="product"
                    className="w-5 h-5 cursor-pointer"
                    checked={active}
                    onChange={() => handleSelect()}
                />
                <span>Select items</span>
            </div>
        </div>
    );
};

export default CartHeader;
