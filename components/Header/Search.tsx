import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Search = () => {
    const [showSearch, setShowSearch] = useState(false);

    return (
        <div className="bg-amazon-orange relative flex flex-grow items-center rounded-md max-md:mx-4 max-md:mb-2">
            <select
                value="All"
                className="hidden md:inline h-11 w-16 rounded-l text-gray-700 px-2 text-sm bg-gray-100 border-r border-gray-300 cursor-pointer outline-none"
            >
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
                className="outline-none w-full h-11 text-black pl-3 max-md:rounded-l"
                placeholder="Search Amazon"
            />
            <MagnifyingGlassIcon className="text-amazon-blue_dark h-8 w-8 my-1 mx-2 cursor-pointer" />
            {showSearch && (
                <div className="z-20 absolute top-11 w-full h-auto bg-white border rounded-sm shadhow-md">
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
    );
};

export default Search;
