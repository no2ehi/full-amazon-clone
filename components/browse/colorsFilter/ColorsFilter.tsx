import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";

const ColorsFilter = ({ colors, colorHandler, replaceQuery }: any) => {
    const [show, setShow] = useState(true);
    const router = useRouter();
    const existedColors = router.query.color || "";

    return (
        <div className="w-full">
            <h3
                onClick={() => setShow((prev: any) => !prev)}
                className={`cursor-pointer my-4 flex items-center justify-between font-semibold `}
            >
                Colors
                <span>
                    {show ? (
                        <MinusIcon className="w-5 h-5" />
                    ) : (
                        <PlusIcon className="w-5 h-5" />
                    )}
                </span>
            </h3>
            {show && (
                <div className="flex flex-wrap gap-3">
                    {colors.map((color: any, i: any) => {
                        const check = replaceQuery("color", color);
                        return (
                            <button
                                onClick={() =>
                                    colorHandler(check.result)
                                }
                                key={i}
                                className={`shadow w-6 h-6 rounded-full hover:outline 
                                hover:outline-2 hover:outline-offset-4 hover:outline-slate-500
                                ${check.active ? 'outline outline-[3px] outline-offset-[3px] outline-slate-500' : ''}`}
                                style={{ background: `${color}` }}
                            ></button>
                        )
                    })}
                </div>
            )}
        </div>
    );
};

export default ColorsFilter;
