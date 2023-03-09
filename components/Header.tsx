import Image from "next/image";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { openMenu } from "@/redux/slices/MenuSlice";

import {
    Bars3Icon,
    MagnifyingGlassIcon,
    MapPinIcon,
    ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import amazonLogo from "../public/assets/images/amazon-logo.png";
import enFlag from "../public/assets/images/en-flag.png";

const Header = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [showAcount, setShowAccount] = useState(false);

    const dispatch = useAppDispatch();

    const openMenuHandler = () => {
        dispatch(openMenu());
    };

    return (
        <header>
            {/* Top Nav */}
            <div className="bg-amazon-blue_dark flex items-center py-3 px-3 md:space-x-5 md:px-5 text-white">
                {/* Logo */}
                <Image
                    src={amazonLogo}
                    alt="amazon-logo"
                    className="object-contain w-28"
                />

                {/* Delivery */}
                <div className="hidden md:inline md:flex items-center link">
                    <MapPinIcon className="h-5 mt-3" />
                    <div className="ml-1">
                        <p className="text-xs text-slate-300">Deliver to</p>
                        <p className="flex font-bold text-sm">Germany</p>
                    </div>
                </div>

                {/* Search */}
                <div className="hidden md:inline bg-amazon-orange relative md:flex flex-grow  w-1/2 items-center rounded-md">
                    <select value="All" className="h-11 w-16 rounded-l text-gray-700 px-2 text-sm bg-gray-100 border-r border-gray-300 cursor-pointer outline-none">
                        <option disabled value="All">
                            All
                        </option>
                        <option value="Computers">Computers</option>
                        <option value="Arts & Crafts">Arts & Crafts</option>
                        <option value="Baby">Baby</option>
                        <option value="Book">Book</option>
                    </select>
                    <input
                        onClick={() => setShowSearch((prev) => !prev)}
                        type="text"
                        className="outline-none w-full h-11 text-black pl-3"
                        placeholder="Search Amazon"
                    />
                    <MagnifyingGlassIcon className="text-amazon-blue_dark h-8 w-8 my-1 mx-2 cursor-pointer" />
                    {showSearch && (
                        <div className="absolute top-11 w-full h-auto bg-white border rounded-sm shadhow-md">
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

                {/* Language */}
                <div className="show-account relative hidden md:inline md:flex items-center link self-end">
                    <Image
                        src={enFlag}
                        alt="flag-country"
                        className="object-contain h-10"
                    />
                    <p className="flex ml-2 font-bold text-sm">
                        EN <ChevronDownIcon className="h-4 self-end ml-1" />
                    </p>

                    {/* popOver Language */}
                    <div className="show-account-popup absolute w-56 top-8 -right-[3.7rem] h-auto bg-white rounded-sm border shadow-md mt-1">
                        <div className="absolute h-3 w-3 bg-white rotate-45 -mt-1 right-[3.85rem] "></div>
                        <div className="flex flex-col p-3">
                            <p className="text-xs text-gray-900 my-2">Change Language <a className="text-[#05a] ml-1" href="">Learn more</a></p>
                            <label className=" flex text-xs text-gray-900 mt-2 " htmlFor="">
                                <input className="mr-2 text-amazon-orange" checked type="radio" name="" id="" />
                                English - EN
                            </label>
                            <div className="w-full h-[1px] bg-gray-200 my-2" />
                            <label className=" flex text-xs text-gray-900 mt-2 " htmlFor="">
                                <input className="mr-2 text-amazon-orange" type="radio" name="" id="" />
                                español - ES
                            </label>
                            <label className=" flex text-xs text-gray-900 mt-2 " htmlFor="">
                                <input className="mr-2 text-amazon-orange" type="radio" name="" id="" />
                                العربية - AR
                            </label>
                            <label className=" flex text-xs text-gray-900 mt-2 " htmlFor="">
                                <input className="mr-2 text-amazon-orange" type="radio" name="" id="" />
                                Deutsch - DE
                            </label>
                        </div>
                        
                    </div>

                </div>

                {/* Buttons */}
                <div className="flex items-center max-md:ml-auto md:space-x-6 space-x-8">
                    <div className="link relative show-account p-1" >
                        <p className="text-xs text-slate-300">Hello, sign in</p>
                        <p className="flex font-bold text-sm">
                            Account & Lists
                            <ChevronDownIcon className="h-4 self-end ml-1" />
                        </p>

                        {/* popOver Account */}
                        <div className="show-account-popup absolute w-96 -right-14 h-auto bg-white rounded-sm border shadow-md mt-1">
                            <div className="absolute h-3 w-3 bg-white rotate-45 -mt-1 right-[3.85rem] "></div>
                            
                            <div className="flex flex-col items-center p-3 m-3 border-b pb-2">
                                <button className="button-orange px-16 py-[0.3rem] text-sm text-gray-900">Sign in</button>
                                <p className="text-xs text-gray-900 mt-2">New customer? <a className="text-[#05a] hover:text-amazon-orange hover:underline" href="">start here</a></p>
                            </div>

                            <div className="flex m-3">

                                <div className="flex flex-col w-1/2">
                                    <h4 className="font-bold text-base text-black mb-2">Your List</h4>
                                    <ul className="text-gray-900 text-xs">
                                        <li>Create a list</li>
                                        <li>Find a list or Registry</li>
                                    </ul>
                                </div>

                                <div className="flex flex-col w-1/2 border-l pl-4">
                                    <h4 className="font-bold text-base text-black mb-2">Your Account</h4>
                                    <ul className="text-gray-900 text-xs">
                                        <li>Account</li>
                                        <li>Orders</li>
                                        <li>Registry</li>
                                        <li>Recommendations</li>
                                        <li>Browsing History</li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                        
                    </div>

                    <div className="link">
                        <p className="text-xs text-slate-300">Returns</p>
                        <p className="font-bold text-sm">& Orders</p>
                    </div>
                    <div className="relative link flex items-center">
                        <span className="flex items-center justify-center absolute top-0 right-8 bg-amazon-orange text-amazon-blue_dark font-bold h-5 w-5 rounded-full">
                            3
                        </span>
                        <ShoppingCartIcon className="h-10" />
                        <p className="hidden md:inline font-bold mt-2 text-sm">
                            Cart
                        </p>
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
                    <span className="font-bold text-sm">All</span>
                </div>
                <div className="flex flex-grow space-x-4 text-sm">
                    <a href="">{"Today's Deals"}</a>
                    <a href="">Customer Service</a>
                    <a className="hidden md:inline" href="">
                        Registery
                    </a>
                    <a className="hidden md:inline" href="">
                        Gift Cards
                    </a>
                    <a className="hidden md:inline" href="">
                        Sell
                    </a>
                </div>
                <div className="hidden md:inline ml-auto text-sm">
                    <a href="">Shop deals in Electronics</a>
                </div>
            </div>
        </header>
    );
};

export default Header;
