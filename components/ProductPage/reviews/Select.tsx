import { ArrowSmallDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

const Select = ({ property, text, data, handleChange }: any) => {
    const [visible, setVisible] = useState(false);

    return (
        <div className="relative mr-1">
            <div className="flex items-center">
                <span className="uppercase text-sm font-semibold">
                    {text == "fit" ? "How Does it fit?" : text}:
                </span>
                <span
                    className="flex items-center min-w-[120px] text-sm mx-2 bg-slate-300 px-2 py-1 rounded cursor-pointer hover:bg-slate-400"
                    onClick={() => setVisible((prev) => !prev)}
                >
                    {text == "size" ? (
                        property || `select ${text}`
                    ) : text == "style" && property ? (
                        <>
                            <span
                                className="w-5 h-5 rounded-full mr-2"
                                style={{
                                    backgroundColor: `${property.color}`,
                                }}
                            ></span>
                            <Image
                                src={property.image}
                                alt={property.color}
                                width={13}
                                height={13}
                                className="rounded"
                            />
                        </>
                    ) : text == "style" ? (
                        `select ${text}`
                    ) : text == "fit" && property ? (
                        property
                    ) : !property && text == "fit" ? (
                        "How Does it fit?"
                    ) : (
                        `select ${text}`
                    )}
                    <ArrowSmallDownIcon className="w-4 h-4 ml-auto" />
                </span>
            </div>
            {visible && (
                <ul
                    // onClick={() => setVisible(false)}
                    onMouseLeave={() => setVisible(false)}
                    className="flex z-50 flex-col items-center bg-white min-w-[120px] p-2 rounded border shadow-md absolute top-8 right-2"
                >
                    {data.map((item: any, i: any) => {
                        if (text === "size") {
                            return (
                                <li
                                    onClick={() => handleChange(item.size)}
                                    className="w-full p-1 rounded hover:bg-slate-200 cursor-pointer"
                                    key={i}
                                >
                                    <span className="text-sm">{item.size}</span>
                                </li>
                            );
                        }
                        if (text === "style") {
                            return (
                                <li
                                    onClick={() => handleChange(item)}
                                    className="w-full flex items-center justify-center p-1 rounded hover:bg-slate-200 cursor-pointer"
                                    key={i}
                                >
                                    <span
                                        className="w-7 h-7 rounded-full mr-2"
                                        style={{
                                            backgroundColor: `${item.color}`,
                                        }}
                                    ></span>
                                    <Image
                                        src={item.image}
                                        alt={item.color}
                                        width={30}
                                        height={30}
                                        className="rounded"
                                    />
                                </li>
                            );
                        }
                        if (text === "fit") {
                            return (
                                <li
                                    onClick={() => handleChange(item)}
                                    className="w-full p-1 rounded hover:bg-slate-200 cursor-pointer"
                                    key={i}
                                >
                                    <span className="text-sm">{item}</span>
                                </li>
                            );
                        }
                    })}
                </ul>
            )}
        </div>
    );
};

export default Select;
