import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { openMenu } from "@/redux/slices/MenuSlice";
import Search from "./Search";

import {
    Bars3Icon,
    MapPinIcon,
} from "@heroicons/react/24/outline";
import amazonLogo from "../../public/assets/images/amazon-logo.png";
import AccountButtons from "./AccountButtons";
import Language from "./Language";
import HeaderBottom from "./HeaderBottom";

const Header = () => {
    const dispatch = useAppDispatch();

    const openMenuHandler = () => {
        dispatch(openMenu());
    };

    return (
        <header>
            
            <div className="bg-amazon-blue_dark flex flex-col md:flex-row">
                <div className="flex flex-grow items-center p-3 md:space-x-5 md:px-4 text-white">
                
                    {/* Menu Icon Mobile */}
                    <div className="flex items-center justify-center">
                        <div
                            onClick={openMenuHandler}
                            className="md:hidden cursor-pointer mr-1">
                            <Bars3Icon className="h-8 md:h-7" />
                        </div>

                        {/* Logo */}
                        <Image
                            src={amazonLogo}
                            alt="amazon-logo"
                            className="object-contain w-20 md:w-28 pt-2"
                        />
                    </div>

                    {/* Delivery to */}
                    <div className="hidden md:inline md:flex items-center link">
                        <MapPinIcon className="h-5 mt-3" />
                        <div className="ml-1">
                            <p className="text-xs text-slate-300">Deliver to</p>
                            <p className="flex font-bold text-sm">Germany</p>
                        </div>
                    </div>

                    {/* Search Desktop*/}
                    <div className="hidden md:flex flex-grow">
                        <Search />
                    </div>

                    {/* Language */}
                    <Language />

                    {/* Account Buttons */}
                    <AccountButtons />

                </div>

                {/* Search Mobile*/}
                <div className="md:hidden">
                    <Search />
                </div>
                
            </div>

            {/* Bottom Header Nav */}
            <HeaderBottom handleOpenMenu={openMenuHandler}/>

        </header>
    );
};

export default Header;
