import {
    ChevronRightIcon,
    EllipsisHorizontalIcon,
    MinusIcon,
    PlusIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

const ParentCategory = ({ category, subCategories, categoryHandler, replaceQuery }: any) => {
    const [show, setShow] = useState(false);
    // const [activeCat, setActiveCat] = useState(false);
    const check = replaceQuery("category",category._id);

    const selectSubCategory = subCategories.filter(
        (c: any) => c.parent?._id == category._id
    );

    const showSub = (e: any) => {
        e.stopPropagation();
        setShow((prev: any) => !prev);
    };

    return (
        <div>
            <h4
                onClick={() => {
                    categoryHandler(category._id);
                    setShow((prev: any) => !prev)
                }}
                className={`${
                    check.active && "text-red-500"
                } cursor-pointer my-2 flex items-center justify-between font-semibold`}
            >
                <span className="flex items-center">
                    {check.active ? (
                        <ChevronRightIcon className="w-4 h-4 mr-2" />
                    ) : (
                        <EllipsisHorizontalIcon className="w-4 h-4 mr-2" />
                    )}
                    {category.name}
                </span>
                {selectSubCategory.length > 0 && (
                    <span>
                        {show ? (
                            <MinusIcon
                                className="w-4 h-4"
                                onClick={(e) => showSub(e)}
                            />
                        ) : (
                            <PlusIcon
                                className="w-4 h-4"
                                onClick={(e) => showSub(e)}
                            />
                        )}
                    </span>
                )}
            </h4>
            {show && subCategories.length > 0 && (
                <div className="my-1 ml-5">
                    {selectSubCategory.map((sc: any,i: any) => (
                        <h5 key={i}
                            // onClick={() => setShow((prev: any) => !prev)}
                            className="cursor-pointer flex items-center  hover:font-semibold hover:text-yellow-500"
                        >
                            <EllipsisHorizontalIcon className="w-4 h-4 mr-2" />
                            <span>{sc.name}</span>
                        </h5>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ParentCategory;
