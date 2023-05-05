import axios from "axios";

export const saveCart = async (cart, user_id) => {
    try {
        const { data } = await axios.post("/api/user/savecart", {
            cart,
            user_id,
        });
        return data;
    } catch (error) {
        console.log("erorr >>>", error.response.data.message);
    }
};

export const saveAddress = async (address) => {
    try {
        const { data } = await axios.post("/api/user/saveaddress", {
            address,
        });
        return data;
    } catch (error) {
        console.log("erorr >>>", error.response.data.message);
    }
};

export const changeActiveAddress = async (id) => {
    try {
        const { data } = await axios.put("/api/user/manageaddress", {
            id,
        });
        return data;
    } catch (error) {
        console.log("erorr >>>", error.response.data.message);
    }
};

export const deleteAddress = async (id) => {
    try {
        const { data } = await axios.delete("/api/user/manageaddress", {
            data: { id },
        });
        return data;
    } catch (error) {
        console.log("erorr >>>", error.response.data.message);
    }
};

export const applyCoupon = async (coupon) => {
    try {
        const { data } = await axios.post("/api/user/applycoupon", {
            coupon,
        });
        return data;
    } catch (error) {
        return { message: error.response.data.message };
    }
};
