import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const MaterialsFilter = ({ styles, styleHandler, replaceQuery }: any) => {
    const [show, setShow] = useState(true);
    return (
        <div className="w-full">
            <h3
                onClick={() => setShow((prev: any) => !prev)}
                className={`cursor-pointer my-4 flex items-center justify-between font-semibold `}
            >
                Styles
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
                    {styles.map((style: any, i: any) => {
                        const check = replaceQuery("style", style);
                        return (
                            <label 
                                onClick={() => styleHandler(check.result)}
                                className="flex items-center cursor-pointer"
                                htmlFor={style}
                            >
                                <input
                                    className="  mr-2 w-4 h-4"
                                    type="checkbox"
                                    name="style"
                                    id={style}
                                    checked={check.active}
                                />
                                {style}
                            </label>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MaterialsFilter;
