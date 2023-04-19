import { ArrowSmallDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

const TableSelect = ({ property, text, data, handleChange }: any) => {
    const [visible, setVisible] = useState(false);

    return (
        <div className="relative mr-1 max-md:mb-3">
            <div className="flex items-center">
                <span className="uppercase text-sm font-semibold">
                    {text == "fit" ? "How Does it fit?" : text}:
                </span>
                <span
                    className="flex items-center min-w-[120px] text-sm mx-2 bg-slate-300 px-2 py-1 rounded cursor-pointer hover:bg-slate-400"
                    onClick={() => setVisible((prev) => !prev)}
                >
                    {text == "rating" || text == "size" || text == "order" ? (
                        property || `select ${text}`
                    ) : text == "style" && property ? (
                        <>
                            <span
                                className="w-5 h-5 rounded-full mr-2"
                                style={{
                                    backgroundColor: `${property.color}`,
                                }}
                            ></span>
                            {property.image ? (
                                <Image
                                    src={property.image}
                                    alt={property.color}
                                    width={13}
                                    height={13}
                                    className="rounded"
                                />
                            ) : (
                                "All Styles"
                            )}
                        </>
                    ) : text == "style" ? (
                        `select ${text}`
                    ) : (
                        `select ${text}`
                    )}
                    <ArrowSmallDownIcon className="w-4 h-4 ml-auto" />
                </span>
            </div>
            {visible && (
                <ul
                    onMouseLeave={() => setVisible(false)}
                    className="flex z-50 flex-col items-center bg-white min-w-[120px] p-2 rounded border shadow-md absolute top-8 right-2"
                >
                    {data.map((item: any, i: any) => {
                        if (text == "rating") {
                            return (
                                <li
                                    onClick={() => handleChange(item.value || "All")}
                                    className="w-full p-1 rounded hover:bg-slate-200 cursor-pointer"
                                    key={i}
                                >
                                    <span className="text-sm">{item.text}</span>
                                </li>
                            );
                        }
                        if (text == "size") {
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
                        if (text == "style") {
                            return (
                                <li
                                    onClick={() => handleChange(item)}
                                    className="w-full flex items-center justify-center p-1 rounded hover:bg-slate-200 cursor-pointer"
                                    key={i}
                                >
                                    {item.color == "All" ? (
                                        ""
                                    ) : (
                                        <span
                                            className="w-7 h-7 rounded-full mr-2"
                                            style={{
                                                backgroundColor: `${item.color}`,
                                            }}
                                        ></span>
                                    )}
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt={item.color}
                                            width={30}
                                            height={30}
                                            className="rounded"
                                        />
                                    ) : (
                                        "All Styles"
                                    )}
                                </li>
                            );
                        }
                        if (text == "order") {
                            return (
                                <li
                                    onClick={() => handleChange(item.value)}
                                    className="w-full p-1 rounded hover:bg-slate-200 cursor-pointer"
                                    key={i}
                                >
                                    <span className="text-sm">{item.text}</span>
                                </li>
                            );
                        }
                    })}
                </ul>
            )}
        </div>
    );
};

export default TableSelect;
