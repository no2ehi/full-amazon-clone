import mongoose from "mongoose";
// import userImageDefault from "../public/assets/images/user-image-default.jpg";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: "please enter your full name",
        },
        email: {
            type: String,
            required: "please enter your email address",
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: "please enter a password",
        },
        role: {
            type: String,
            default: "user",
        },
        image: {
            type: String,
            default: "https://i.im.ge/2023/04/25/Lg2cWX.user-image-default.jpg",
        },
        emailVerified: {
            type: Boolean,
            default: false,
        },
        defaultPaymentMethod: {
            type: String,
            default: "",
        },
        address: [
            {
                firstName: {
                    type: String,
                },
                lastName: {
                    type: String,
                },
                phoneNumber: {
                    type: String,
                },
                address1: {
                    type: String,
                },
                address2: {
                    type: String,
                },
                city: {
                    type: String,
                },
                zipCode: {
                    type: String,
                },
                state: {
                    type: String,
                },
                country: {
                    type: String,
                },
                active: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
