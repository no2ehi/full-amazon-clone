import Image from "next/image";
import {
    CheckIcon,
    ChevronUpIcon,
    MapPinIcon,
    PhoneIcon,
    PlusSmallIcon,
    UserIcon,
} from "@heroicons/react/24/outline";

const ListShipping = ({ visible, setVisible, addresses, userImage }: any) => {
    return (
        <>
            {addresses.map((address: any) => (
                <div
                    className={`p-4 mb-4 border border-slate-100 rounded-xl shadow-md hover:shadow-xl hover:border-white hover:scale-[101%] transition duration-300 ${
                        !address.active &&
                        "border-l-4 border-l-amazon-blue_light hover:border-l-amazon-blue_light"
                    }`}
                    key={address._id}
                >
                    <div className="grid grid-cols-2 justify-center">
                        <div className="mb-4">
                            <Image
                                src={userImage}
                                alt={address._id}
                                width={60}
                                height={60}
                                className="rounded-full"
                            />
                        </div>
                        <div className="flex flex-col md:justify-center">
                            <span className="flex items-center">
                                <UserIcon className="w-4 h-4 mr-1" />
                                {address.firstName.toUpperCase()}{" "}
                                {address.lastName.toUpperCase()}
                            </span>
                            <span className="flex items-center">
                                <PhoneIcon className="w-4 h-4 mr-1" />
                                {address.phoneNumber.toUpperCase()}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div>
                            <span className="flex items-center">
                                <MapPinIcon className="w-5 h-5 mr-1" />
                                {address.address1}
                            </span>
                            {address.address2 &&
                            (
                                <span className="flex items-center">
                                    <MapPinIcon className="w-5 h-5 mr-1" />
                                    {address.address2}
                                </span>
                            )}
                        </div>
                        <span>
                            {address.city},{address.state},{address.country}
                        </span>
                        <div className="flex justify-between">
                            <span>{address.zipCode}</span>
                            <span
                                className={`flex items-center text-amazon-blue_light font-semibold ${
                                    !address.active && ""
                                }`}
                            >
                                <CheckIcon className="w-5 h-5 " /> Active
                            </span>
                        </div>
                    </div>
                </div>
            ))}

            <div className="flex justify-center">
                <button
                    onClick={() => setVisible((prev: any) => !prev)}
                    className={`flex justify-center w-52 my-4  py-4 rounded-xl hover:text-amazon-blue_dark font-bold bg-gradient-to-r hover:from-amazon-orange hover:to-yellow-300 hover:text-amazon-blue_dark  text-slate-100 from-amazon-blue_light to-slate-500 transition duration-300 hover:scale-95 `}
                >
                    {visible ? (
                        <span>
                            <ChevronUpIcon className="h-6 w-6" />
                        </span>
                    ) : (
                        <span className="flex items-center">
                            <PlusSmallIcon className="h-6 w-6" /> Add New
                            Address
                        </span>
                    )}
                </button>
            </div>
        </>
    );
};

export default ListShipping;
