import mongoose from "mongoose";
const { objectId } = mongoose.Schema;
const reviewShema =  new mongoose.Schema({
    reviewBy: {
        type: objectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    size: {
        type: String,
    },
    style: {
        color: String,
        image: String,
    },
    fit: {
        type: String,
    },
    images: [],
    likes: [],
})
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    brand:{
        type: String,
    },
    slug:{
        type: String,
        required: true,
    },
    category:{
        type: objectId,
        required: true,
        ref: "Category",
    },
    subCategories: [
        {
            type: objectId,
            ref: "subCategory"
        }
    ],
    details: [
        {
            name: String,
            value: String
        }
    ],
    details: [
        {
            name: String,
            value: String
        }
    ],
    questions: [
        {
            question: String,
            answer: String
        }
    ],
    reviews: [
        reviewSchema,
    ],
    refundPolicy: {
        type: String,
        default: "30 days"
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    numberReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    shipping: {
        type: Number,
        required: true,
        default: 0,
    },
    subProducts: [
        {
            images: [],
            description_images: [],
            color: {
                color: {
                    type: String,
                },
                image: {
                    type: String
                },
            },
            sizes: [
                {
                    size: String,
                    qty: Number,
                    price: Number,
                },
            ],
            discount: {
                type: Number,
                default: 0
            },
            sold: {
                type: Number,
                default: 0
            },
        },
    ],
}, {
    timestamps: true
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;