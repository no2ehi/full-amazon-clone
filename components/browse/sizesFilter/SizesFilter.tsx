import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Size from "./Size";

const sizesFilter = ({sizes, sizeHandler}: any) => {
    const [show, setShow] = useState(true);
    return ( 
        <div className="w-full">
            <h3 onClick={() => setShow((prev: any) => !prev)} className={`cursor-pointer my-4 flex items-center justify-between font-semibold `}>
                Sizes <span>{show ? <MinusIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}</span>
            </h3>
            {
                show && (
                    <div className="grid grid-cols-2 gap-1">
                        {sizes.map((size: any,i:any) => (
                         <Size key={i} size={size}  sizeHandler={sizeHandler}/>
                        ))}
                    </div>
                )
            }
        </div>
     );
}
 
export default sizesFilter;