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

const ShippingPage = ({ user, addresses, setAddresses }: any) => {
    const [shipping, setShipping] = useState(initialValue);
    const [visible, setVisible] = useState(user?.address.length ? false : true);

    return (
        <>
            <div className="text-xl font-semibold pb-2 mb-4 border-b border-b-2 ">
                Shipping Information
            </div>
            <ListShipping
                visible={visible}
                setVisible={setVisible}
                addresses={addresses}
                setAddresses={setAddresses}
                userImage={user?.image}
            />
            {visible && (
                <AddShipping
                    shipping={shipping}
                    setShipping={setShipping}
                    addresses={addresses}
                    setAddresses={setAddresses}
                    initialValue={initialValue}
                />
            )}
        </>
    );
};

export default ShippingPage;
