import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Material from "./Material";

const MaterialsFilter = ({ materials, materialHandler, replaceQuery }: any) => {
    const [show, setShow] = useState(true);
    return (
        <div className="w-full">
            <h3
                onClick={() => setShow((prev: any) => !prev)}
                className={`cursor-pointer my-4 flex items-center justify-between font-semibold `}
            >
                Materials
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
                    {materials.map((material: any, i: any) => {
                        const check = replaceQuery("material", material);
                        return (
                            <label
                                onClick={() => materialHandler(check.result)}
                                className="flex items-center cursor-pointer"
                                htmlFor={material}
                            >
                                <input
                                    className="cursor-pointer  mr-2 w-4 h-4"
                                    type="checkbox"
                                    name="material"
                                    id={material}
                                    checked={check.ctive}
                                />
                                {material.length > 8
                                    ? `${material.substring(0, 8)}...`
                                    : material}
                            </label>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MaterialsFilter;
