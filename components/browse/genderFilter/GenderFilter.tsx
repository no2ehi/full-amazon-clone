import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const GenderFilter = ({ genderHandler, replaceQuery }: any) => {
    const genders = ["Men", "Women", "Unisex"];
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
                    {genders.map((gender: any, i: any) => {
                        const check = replaceQuery("gender", gender);
                        return (
                            <label 
                            key={i}
                                onClick={() => genderHandler(check.result)}
                                className="flex items-center cursor-pointer"
                                htmlFor={gender}
                            >
                                <input
                                    className="cursor-pointer  mr-2 w-4 h-4"
                                    type="checkbox"
                                    name="gender"
                                    id={gender}
                                    checked={check.active}
                                />
                                {gender}
                            </label>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default GenderFilter;
