import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ParentCategory from "./ParentCategory";

const CategoriesFilter = ({
    categories,
    subCategories,
    categoryHandler,
    checkChecked
}: any) => {
    const [show, setShow] = useState(true);
    return (
        <div className="w-full">
            <h3
                className={`cursor-pointer my-4 flex items-center justify-between font-semibold `}
            >
                Category
                <span>
                    {show ? (
                        <MinusIcon
                            className="w-5 h-5"
                            onClick={() => setShow((prev: any) => !prev)}
                        />
                    ) : (
                        <PlusIcon
                            className="w-5 h-5"
                            onClick={() => setShow((prev: any) => !prev)}
                        />
                    )}
                </span>
            </h3>
            {show &&
                categories.map((c: any) => (
                    <ParentCategory
                        key={c._id}
                        category={c}
                        subCategories={subCategories}
                        categoryHandler={categoryHandler}

                        checkChecked
                    />
                ))}
        </div>
    );
};

export default CategoriesFilter;
