import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import slugify from "slugify";
import { useRouter } from "next/router";

const Item = ({ item, visible, index }: any) => {
    const [show, setShow] = useState(visible);
    const router = useRouter();
    
    return (
        <li className="py-2 cursor-pointer transition-all duration-300 text-amazon-blue_light">
            {item.heading == "Sign Out" ? (
                <b className="hover:text-[#fda22c]" onClick={() => signOut()}>
                    Sign Out
                </b>
            ) : (
                <b
                    className=" hover:text-[#fda22c] flex items-center justify-between transition-all"
                    onClick={() => setShow((prev: any) => !prev)}
                >
                    <span className={`${show && "text-[#fda22c]"}`}>
                        {item.heading}
                    </span>
                    {show ? (
                        <MinusIcon className="w-5 h-5 fill-[#fda22c]" />
                    ) : (
                        <PlusIcon className="w-5 h-5 mr-2" />
                    )}
                </b>
            )}
            {show && (
                <ul className="ml-2">
                    {item.links.map((link: any, i: any) => (
                        <>
                            {link.link.startsWith("/profile/orders") ? (
                                <li
                                    className={`${
                                        (router.query.q?.split("__")[0] || "") == slugify(link.name, {lower: true}) ? "text-black font-semibold" : "text-slate-600"
                                    } flex items-center  py-1 hover:text-[#fda22c] hover:font-semibold transition-all`}
                                    key={i}
                                >
                                    <ArrowLongRightIcon className="w-5 h-5 mr-2" />
                                    <Link
                                        href={`${
                                            link.link
                                        }?tab=${index}&q=${slugify(link.name, {
                                            lower: true,
                                        })}__${link.filter}`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ) : (
                                <li
                                    className={`${
                                        (router.query.q || "") ==
                                        slugify(link.name, { lower: true })
                                            ? "text-black font-semibold"
                                            : "text-slate-600"
                                    } flex items-center  py-1 hover:text-[#fda22c] hover:font-semibold transition-all`}
                                    key={i}
                                >
                                    <ArrowLongRightIcon className="w-5 h-5 mr-2" />
                                    <Link
                                        href={`${
                                            link.link
                                        }?tab=${index}&q=${slugify(link.name, {
                                            lower: true,
                                        })}`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            )}
                        </>
                    ))}
                </ul>
            )}
        </li>
    );
};

export default Item;
