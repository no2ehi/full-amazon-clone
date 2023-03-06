import Image from "next/image";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { openMenu } from "@/redux/slices/MenuSlice";

import {
    Bars3Icon,
    MagnifyingGlassIcon,
    ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import amazonLogo from "../public/assets/images/amazon-logo.png";

const Header = () => {
    const [showSearch, setShowSearch] = useState(false);

    const dispatch = useAppDispatch();

    const openMenuHandler = () => {
        dispatch(openMenu());
    };

    return (
        <header>
            {/* Top Nav */}
            <div className="bg-amazon-blue_dark flex items-center py-3 px-3 md:space-x-10 md:px-5 text-white">
                {/* Logo */}
                <Image
                    src={amazonLogo}
                    alt="amazon-logo"
                    className="object-contain w-28"
                />
                {/* Search */}
                <div className="hidden md:inline bg-amazon-orange relative md:flex flex-grow  w-1/2 items-center rounded-md">
                    <input
                        onClick={() => setShowSearch((prev) => !prev)}
                        type="text"
                        className="outline-none w-full h-10 rounded-l-md text-black pl-3"
                        placeholder="Search Amazon"
                    />
                    <MagnifyingGlassIcon className="text-amazon-blue_dark h-8 w-8 my-1 mx-2 cursor-pointer" />
                    {showSearch && (
                        <div className="absolute top-10 w-full h-auto bg-white border rounded-sm shadhow-md">
                            <ul className="text-black">
                                <li className="px-3 py-2 border-b cursor-pointer hover:bg-gray-100 font-semibold">
                                    search Result
                                </li>
                                <li className="px-3 py-2 border-b cursor-pointer hover:bg-gray-100 font-semibold">
                                    search Result
                                </li>
                                <li className="px-3 py-2 border-b cursor-pointer hover:bg-gray-100 font-semibold">
                                    search Result
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex items-center max-md:ml-auto md:space-x-6 space-x-8">
                    <div className="link">
                        <p>Hello, signin</p>
                        <p>Account & Lists</p>
                    </div>
                    <div className="link">
                        <p>Returns</p>
                        <p>& Orders</p>
                    </div>
                    <div className="relative link flex items-center">
                        <span className="flex items-center justify-center absolute top-0 right-8 bg-amazon-orange text-amazon-blue_dark font-bold h-5 w-5 rounded-full">
                            3
                        </span>
                        <ShoppingCartIcon className="h-10" />
                        <p className="hidden md:inline font-bold mt-2">Cart</p>
                    </div>
                </div>
            </div>

            {/* Bottom Nav */}
            <div className="bg-amazon-blue_light flex items-center py-2 px-4 space-x-4 text-white ">
                <div
                    onClick={openMenuHandler}
                    className="flex items-center cursor-pointer mr-2 text-lg"
                >
                    <Bars3Icon className="h-7 mr-1" />
                    <span className="font-bold">All</span>
                </div>
                <div className="flex flex-grow space-x-4 text-md">
                    <a href="">Today's Deals</a>
                    <a href="">Customer Service</a>
                    <a className="hidden md:inline" href="">Registery</a>
                    <a className="hidden md:inline" href="">Gift Cards</a>
                    <a className="hidden md:inline" href="">Sell</a>
                </div>
                <div className="hidden md:inline ml-auto">
                    <a href="">Shop deals in Electronics</a>
                </div>
            </div>
        </header>
    );
};

export default Header;
