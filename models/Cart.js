import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const CartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: ObjectId,
                ref: "Product",
            },
            name: {
                type: String,
            },
            image: {
                type: String,
            },
            size: {
                type: String,
            },
            qty: {
                type: Number,
            },
            color: {
                color: String,
                image: String
            },
            price: {
                type: Number,
            },
        }
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    user: {
        type: ObjectId,
        ref: "User",
    },
}, {
    timestamps: true
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export default Cart;