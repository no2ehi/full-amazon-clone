import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const SizesFilter = ({ sizes, sizeHandler, replaceQuery }: any) => {
    const [show, setShow] = useState(true);
    return (
        <div className="w-full">
            <h3
                onClick={() => setShow((prev: any) => !prev)}
                className={`cursor-pointer my-4 flex items-center justify-between font-semibold `}
            >
                Sizes{" "}
                <span>
                    {show ? (
                        <MinusIcon className="w-5 h-5" />
                    ) : (
                        <PlusIcon className="w-5 h-5" />
                    )}
                </span>
            </h3>
            {show && (
                <div className="grid grid-cols-2 gap-1">
                    {sizes.map((size: any, i: any) => {
                        const check = replaceQuery("size", size);
                        return (
                            <label
                            key={i}
                                onClick={() => sizeHandler(check.result)}
                                className="flex items-center cursor-pointer text-sm"
                                htmlFor={size}
                            >
                                <input
                                    className="mr-1.5 w-4 h-4"
                                    type="checkbox"
                                    name="size"
                                    id={size}
                                    checked={check.active}
                                />
                                {size}
                            </label>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SizesFilter;
