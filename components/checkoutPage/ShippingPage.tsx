import { useState } from "react";
import AddShipping from "./AddShipping";
import ListShipping from "./ListShipping";

const initialValue = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    state: "",
    city: "",
    zipCode: "",
    address1: "",
    address2: "",
    country: "",
};

const ShippingPage = ({ user, selectedAddress, setSelectedAddress }: any) => {
    const [addresses, setAddresses] = useState(user?.address || []);
    const [shipping, setShipping] = useState(initialValue);
    const [visible, setVisible] = useState(user?.address.length ? false : true);
    console.log("address > ", addresses, "user > ", user);

    return (
        <div className="flex flex-col md:flex-row px-2 py-8 md:px-8 gap-4">
            <div className="md:w-1/2">
                <ListShipping
                    visible={visible}
                    setVisible={setVisible}
                    addresses={addresses}
                    userImage={user?.image}
                />
                {visible && (
                    <AddShipping
                        shipping={shipping}
                        setShipping={setShipping}
                        addresses={addresses}
                        setAddresses={setAddresses}
                        setSelectedAddress={setSelectedAddress}
                        userId={user._id}
                    />
                )}
            </div>
        </div>
    );
};

export default ShippingPage;
