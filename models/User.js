import mongoose from "mongoose";

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
            default: "https://i.stack.imgur.com/34AD2.jpg",
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
