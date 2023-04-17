import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
    selectMenuSidebarDashboard,
    toggleSidebar,
} from "@/redux/slices/MenuSlice";
import { ChevronRightIcon, RectangleGroupIcon, Square3Stack3DIcon, Squares2X2Icon, SquaresPlusIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
    const router = useRouter();
    const route = router.pathname.split("/admin/dashboard/")[1];
    const dispatch = useAppDispatch();
    const menuSidebar = useAppSelector(selectMenuSidebarDashboard);
    const { data: session } = useSession();

    const handleMenu = () => {
        dispatch(toggleSidebar());
    };
    return (
        <div
            className={`relative bg-slate-100 h-screen md:p-3 
        ${menuSidebar ? 'opened' : "w-[80px]"}`}
        >
            <div
                className="absolute top-4 -right-6 bg-slate-100 py-2 rounded-r"
                onClick={() => handleMenu()}
            >
                <ChevronRightIcon
                    className={`w-6 h-6 cursor-pointer ${
                        menuSidebar && "rotate-180"
                    }`}
                />
            </div>

            <div className="flex mt-4 px-2">
                <div className="relative w-10 h-10 ">
                    <Image
                        src={session?.user?.image}
                        alt="admin-logo"
                        fill
                        className="object-contain rounded-full"
                    />
                </div>

                <div className="show flex-col text-sm justify-center pl-3">
                    <span className="font-semibold">Welcom back 👋</span>
                    <span className="text-slate-600">
                        {session?.user?.name}
                    </span>
                </div>
            </div>

            <div className="mt-6 px-2">
                <ul className="space-y-2">
                    <li>
                        <Link
                            className={`flex items-center p-2 rounded hover:bg-slate-200 transition duration-300 ${
                                route === undefined ? "bg-slate-300" : ""
                            }`}
                            href="/admin/dashboard"
                        >
                            <Square3Stack3DIcon className="w-6 h-6" />
                            <span className="show pl-3 text-slate-600">
                                Dashboard
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={`flex items-center p-2 rounded hover:bg-slate-200 transition duration-300 ${
                                route === "categories" ? "bg-slate-300" : ""
                            }`}
                            href="/admin/dashboard/categories"
                        >
                            <Squares2X2Icon className="w-6 h-6" />
                            <span className="show pl-3 text-slate-600">
                                Category
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={`flex items-center p-2 rounded hover:bg-slate-200 transition duration-300 ${
                                route === "sub-categories" ? "bg-slate-300" : ""
                            }`}
                            href="/admin/dashboard/sub-categories"
                        >
                            <SquaresPlusIcon className="w-6 h-6" />
                            <span className="show pl-3 text-slate-600">
                                Sub Categories
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={`flex items-center p-2 rounded hover:bg-slate-200 transition duration-300 ${
                                route === "products" ? "bg-slate-300" : ""
                            }`}
                            href="/admin/dashboard/product"
                        >
                            <RectangleGroupIcon className="w-6 h-6" />
                            <span className="show pl-3 text-slate-600">
                                Product
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={`flex items-center p-2 rounded hover:bg-slate-200 transition duration-300 ${
                                route === "products" ? "bg-slate-300" : ""
                            }`}
                            href="/admin/dashboard/product/create"
                        >
                            <RectangleGroupIcon className="w-6 h-6" />
                            <span className="show pl-3 text-slate-600">
                                Create Product
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
