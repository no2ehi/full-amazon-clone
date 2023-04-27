import { ChevronRightIcon, EllipsisHorizontalIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const ParentCategory = ({category,subCategories}: any) => {
    const [show, setShow] = useState(false);

    return ( 
        <div>
            <h4 onClick={() => setShow((prev: any) => !prev)} className={`${show && 'text-amazon-blue_light'} cursor-pointer my-2 flex items-center justify-between font-semibold`}>
                <span className="flex items-center">
                    {show ?  <ChevronRightIcon className="w-4 h-4 mr-2" /> :  <EllipsisHorizontalIcon className="w-4 h-4 mr-2" />}{category.name}
                </span>
                 <span>{show ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}</span>
            </h4>
            {
                show && (
                    <div className="my-1 ml-5">
                        {subCategories.filter((c: any) => c.parent?._id == category._id).map((sc: any) => (
                        <h5 onClick={() => setShow((prev: any) => !prev)} className="cursor-pointer flex items-center  hover:font-semibold hover:text-yellow-500">
                            <EllipsisHorizontalIcon className="w-4 h-4 mr-2" /><span>{sc.name}</span>
                        </h5>
                        ))}
                    </div>
                )
            }
        </div>
     );
}
 
export default ParentCategory;