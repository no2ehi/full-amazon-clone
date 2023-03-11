import { MapPinIcon } from "@heroicons/react/24/outline";

const DeliveryTo = () => {
    return ( 
        <div className="hidden md:inline md:flex items-center link">
            <MapPinIcon className="h-5 mt-3" />
            <div className="ml-1">
                <p className="text-xs text-slate-300">Deliver to</p>
                <p className="flex font-bold text-sm">Germany</p>
            </div>
        </div>
     );
}
 
export default DeliveryTo;