import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Style from "./Material";

const MaterialsFilter = ({materials}: any) => {
    const [show, setShow] = useState(true);
    return ( 
        <div className="w-full">
            <h3 onClick={() => setShow((prev: any) => !prev)} className={`cursor-pointer my-4 flex items-center justify-between font-semibold `}>
            Materials <span>{show ? <MinusIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}</span>
            </h3>
            {
                show && (
                    <div className="grid grid-cols-2 gap-1">
                        {materials.map((material: any, i:any) => (
                         <Style key={i} material={material}  />
                        ))}
                    </div>
                )
            }
        </div>
     );
}
 
export default MaterialsFilter;