import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeMenu, selectMenu } from "@/redux/slices/MenuSlice";
import { RootState } from "@/redux/store";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";

const MenuSideBar = () => {
    const dispatch = useAppDispatch();
    const menu = useAppSelector(selectMenu);

    return (
        <>
            <div
                className={`flex flex-col fixed bg-white shadow-xl w-72 md:w-96 h-screen top-0 z-50 
               ${menu ? "block" : "hidden"}
            `}
            >
                <div className="relative">
                    <div
                        className="absolute top-3 cursor-pointer -right-12 hover:scale-110 transition"
                        onClick={() => dispatch(closeMenu())}
                    >
                        <XMarkIcon className="h-9 text-white drop-shadow-md" />
                    </div>

                    <div className="flex items-center bg-amazon-blue_light text-white px-8 py-3 ">
                        <UserCircleIcon className="h-9" />
                        <b className="text-xl font-bold ml-3">Hello, sign in</b>
                    </div>

                    <div className="menu-sidebar flex flex-col py-2 overflow-y-scroll h-[85%]">

                        <h3>
                            Digital Content & Devices
                        </h3>
                        <ul className="border-b pb-2">
                            <li className="group">
                                Amazon Music
                                <ChevronRightIcon className="group-hover:text-gray-800"  />
                            </li>
                            <li className="group">
                                Amazon Appstore
                                <ChevronRightIcon className="group-hover:text-gray-800" />
                            </li>
                        </ul>

                        <h3>
                            Shop By Department
                        </h3>
                        <ul className="border-b pb-2">
                            <li className="group">
                                Electronics
                                <ChevronRightIcon className="group-hover:text-gray-800" />
                            </li>
                            <li className="group flex">
                                Computers
                                <ChevronRightIcon className="group-hover:text-gray-800" />
                            </li>
                            <li className="group">
                                Smart Home
                                <ChevronRightIcon className="group-hover:text-gray-800" />
                            </li>
                            <li className="group">
                                Arts & Crafts
                                <ChevronRightIcon className="group-hover:text-gray-800" />
                            </li>
                        </ul>

                        <h3>
                            Programs & Features
                        </h3>
                        <ul className="border-b pb-2">
                            <li className="group">
                                Gift Cards
                                <ChevronRightIcon className="group-hover:text-gray-800" />
                            </li>
                            <li className="group">
                                Shop By Interest
                                <ChevronRightIcon className="group-hover:text-gray-800" />
                            </li>
                            <li className="group">
                                Amazon Live
                                <ChevronRightIcon className="group-hover:text-gray-800" />
                            </li>
                        </ul>

                    </div>
                </div>
            </div>

            {menu && (
                <div
                    onClick={() => dispatch(closeMenu())}
                    className="fixed bg-zinc-900/[0.85] w-full  h-screen z-40 top-0 right-0"
                ></div>
            )}
        </>
    );
};

export default MenuSideBar;
