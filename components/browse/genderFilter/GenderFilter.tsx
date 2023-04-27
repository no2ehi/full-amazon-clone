import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const MaterialsFilter = () => {
    const genders = ["Men", "Women","Unisex"]
    const [show, setShow] = useState(true);
    return (
        <div className="w-full">
            <h3
                onClick={() => setShow((prev: any) => !prev)}
                className={`cursor-pointer my-4 flex items-center justify-between font-semibold `}
            >
                Gender
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
                    {genders.map((gender: any, i: any) => (
                        <div key={i} className="flex items-center cursor-pointer">
                            <input
                                className="cursor-pointer  mr-2 w-4 h-4"
                                type="checkbox"
                                name="gender"
                                id={gender}
                            />
                            <label
                                className="cursor-pointer "
                                htmlFor={gender}
                            >
                                {gender}
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MaterialsFilter;
