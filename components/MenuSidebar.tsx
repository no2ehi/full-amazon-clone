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

                    <div className="flex flex-col py-2 overflow-y-scroll h-[85%]">

                        <h3 className="font-bold text-xl px-8 py-3">
                            Digital Content & Devices
                        </h3>
                        <ul className="border-b pb-2">
                            <li className="group flex items-center px-8 py-3 hover:bg-gray-200 cursor-pointer">
                                Amazon Music
                                <ChevronRightIcon className="h-5 ml-auto text-gray-500 stroke-[3] group-hover:text-gray-800" />
                            </li>
                            <li className="group flex items-center px-8 py-3 hover:bg-gray-200 cursor-pointer">
                                Kindle E-readers & bookd
                                <ChevronRightIcon className="h-5 ml-auto text-gray-500 stroke-[3] group-hover:text-gray-800" />
                            </li>
                            <li className="group flex items-center px-8 py-3 hover:bg-gray-200 cursor-pointer">
                                Amazon Appstore
                                <ChevronRightIcon className="h-5 ml-auto text-gray-500 stroke-[3] group-hover:text-gray-800" />
                            </li>
                        </ul>

                        <h3 className="font-bold text-xl px-8 py-3">
                            Shop By Department
                        </h3>
                        <ul className="border-b pb-2">
                            <li className="group flex items-center px-8 py-3 hover:bg-gray-200 cursor-pointer">
                                Electronics
                                <ChevronRightIcon className="h-5 ml-auto text-gray-500 stroke-[3] group-hover:text-gray-800" />
                            </li>
                            <li className="group flex items-center px-8 py-3 hover:bg-gray-200 cursor-pointer">
                                Computers
                                <ChevronRightIcon className="h-5 ml-auto text-gray-500 stroke-[3] group-hover:text-gray-800" />
                            </li>
                            <li className="group flex items-center px-8 py-3 hover:bg-gray-200 cursor-pointer">
                                Smart Home
                                <ChevronRightIcon className="h-5 ml-auto text-gray-500 stroke-[3] group-hover:text-gray-800" />
                            </li>
                            <li className="group flex items-center px-8 py-3 hover:bg-gray-200 cursor-pointer">
                                Arts & Crafts
                                <ChevronRightIcon className="h-5 ml-auto text-gray-500 stroke-[3] group-hover:text-gray-800" />
                            </li>
                        </ul>

                        <h3 className="font-bold text-xl px-8 py-3">
                            Programs & Features
                        </h3>
                        <ul className="border-b pb-2">
                            <li className="group flex items-center px-8 py-3 hover:bg-gray-200 cursor-pointer">
                                Gift Cards
                                <ChevronRightIcon className="h-5 ml-auto text-gray-500 stroke-[3] group-hover:text-gray-800" />
                            </li>
                            <li className="group flex items-center px-8 py-3 hover:bg-gray-200 cursor-pointer">
                                Shop By Interest
                                <ChevronRightIcon className="h-5 ml-auto text-gray-500 stroke-[3] group-hover:text-gray-800" />
                            </li>
                            <li className="group flex items-center px-8 py-3 hover:bg-gray-200 cursor-pointer">
                                Amazon Live
                                <ChevronRightIcon className="h-5 ml-auto text-gray-500 stroke-[3] group-hover:text-gray-800" />
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
