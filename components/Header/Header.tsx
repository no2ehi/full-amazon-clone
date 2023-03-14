import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { openMenu } from "@/redux/slices/MenuSlice";
import Search from "./Search";

import {
    Bars3Icon,
} from "@heroicons/react/24/outline";
import amazonLogo from "../../public/assets/images/amazon-logo.png";
import AccountButtons from "./AccountButtons";
import Language from "./Language";
import HeaderBottom from "./HeaderBottom";
import DeliveryTo from "./DeliveryTo";
import Link from "next/link";


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
                        <Link href="/">
                            <Image
                                src={amazonLogo}
                                alt="amazon-logo"
                                className="object-contain w-20 md:w-28 pt-2"
                            />
                        </Link>
                    </div>

                    <DeliveryTo />

                    {/* Search Desktop*/}
                    <div className="hidden md:flex flex-grow">
                        <Search />
                    </div>

                    <Language />
                    <AccountButtons />
                </div>

                {/* Search Mobile*/}
                <div className="md:hidden">
                    <Search />
                </div>
                
            </div>

            <HeaderBottom handleOpenMenu={openMenuHandler}/>
        </header>
    );
};

export default Header;
