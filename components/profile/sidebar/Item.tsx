import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";

const Item = ({ item, visible, index }: any) => {
    const [show, setShow] = useState(visible);

    return (
        <li className="py-2 cursor-pointer transition-all duration-300 text-amazon-blue_light">
            {item.heading == "Sign Out" ? (
                <b onClick={() => signOut()}>Sign Out</b>
            ) : (
                <b className="flex items-center justify-between" onClick={() => setShow((prev: any) => !prev)}>
                    <span className={`${show && 'text-[#fda22c]'}`}>{item.haeding}</span>{show ? (
                        <MinusIcon className="w-5 h-5 mr-2 fill-[#fda22c]" />
                    ) : (
                        <PlusIcon className="w-5 h-5 mr-2" />
                    )}
                </b>
            )}
            {show && item.links && (
                <ul className="ml-2">
                    {item.links.map((link: any, i: any) => (
                        <li className="flex items-center py-1 hover:text-[#fda22c] hover:font-semibold transition-all" key={i}>
                            <ArrowLongRightIcon className="w-5 h-5 mr-2" /><Link href={link.link}>{link.name}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
};

export default Item;
