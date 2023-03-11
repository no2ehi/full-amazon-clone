import {
    Bars3Icon,
    MapPinIcon,
} from "@heroicons/react/24/outline";

const HeaderBottom = ({ handleOpenMenu }: any) => {
    return ( 
        <>
        <div className="bg-amazon-blue_dark md:bg-amazon-blue_light flex items-center py-2 px-4 md:space-x-4 text-white max-md:-mt-1 max-md:pb-4">
        <div
            onClick={handleOpenMenu}
            className="hidden md:flex items-center cursor-pointer mr-2 text-lg"
        >
            <Bars3Icon className="h-7 mr-1" />
            <span className="font-bold text-sm">All</span>
        </div>
        <div className="flex flex-grow space-x-4 text-sm">
            <a href="">Deals</a>
            <a href="">Customer Service</a>
            <a href="">
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

    <div className="flex md:hidden items-center p-2 bg-amazon-blue_light text-slate-200 max-md:-mt-1">
        <MapPinIcon className="h-6 mr-1" />
        <span className="text-sm">Deliver to Germany</span>
    </div>
    </>
    );
}
 
export default HeaderBottom;