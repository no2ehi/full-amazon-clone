import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ParentCategory from "./ParentCategory";

const CategoriesFilter = ({categories, subCategories}: any) => {
    const [show, setShow] = useState(true);
    return ( 
        <div className="w-full">
            <h3 onClick={() => setShow((prev: any) => !prev)} className={`cursor-pointer my-4 flex items-center justify-between font-semibold `}>
                Category <span>{show ? <MinusIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}</span>
            </h3>
            {
                show && (
                    categories.map((c: any) => (
                        <ParentCategory key={c._id} category={c} subCategories={subCategories} />
                    ))
                )
            }
        </div>
     );
}
 
export default CategoriesFilter;