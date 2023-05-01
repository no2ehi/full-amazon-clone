import Layout from "@/components/admin/layout/Layout";
import CreateProduct from "@/components/admin/product/CreateProduct";
import db from "../../../../utils/db";
import Product from "../../../../models/Product";
import Category from "../../../../models/Category";
import { useEffect, useState } from "react";
import axios from "axios";

const initialState = {
    name: "",
    description: "",
    brand: "",
    sku: "",
    discount: 0,
    images: [],
    description_images: [],
    parent: "",
    category: "",
    subCategories: [],
    color: {
        color: "",
        image: "",
    },
    sizes: [
        {
            size: "",
            qty: "",
            price: "",
        },
    ],
    details: [
        {
            name: "",
            value: "",
        },
    ],
    questions: [
        {
            question: "",
            answer: "",
        },
    ],
    shippingFee: "",
};

const Create = ({ parents, categories }: any) => {
    const [product, setProduct] = useState(initialState);
    const [subs, setSubs] = useState([]);
    const [colorImage, setColorImage] = useState("");
    const [images, setImages] = useState([]);
    const [description_images, setDescription_images] = useState("");
    const [loading, setLoading] = useState(false);

    // console.log("product: ", product);

    useEffect(() => {    
        async function getParentData() {
            const { data } = await axios.get(`/api/product/${product.parent || " "}`);
            if(data) {
                setProduct({
                    ...product,
                    name: data.name,
                    description: data.description,
                    brand: data.brand,
                    category: data.category,
                    subCategories: data.subCategories,
                    questions: data.questions,
                    details: data.details,
                })
            }
            // console.log('id product: ', data)
        };
        if (product.parent) {
            getParentData();
        }
    }, [product.parent]);

    useEffect(() => {
 
        async function getSubs() {
            const { data } = await axios.get("/api/admin/subcategory", {
                params: {
                    category: product.category,
                },
            });
            setSubs(data);
        }
        getSubs();
    }, [product.category]);

    return (
        <Layout>
            <CreateProduct
                parents={parents}
                product={product}
                setProduct={setProduct}
                categories={categories}
                subs={subs}
                images={images}
                setImages={setImages}
                setColorImage={setColorImage}
                colorImage={colorImage}
                setLoading={setLoading}
                initialProduct={initialState}
            />
        </Layout>
    );
};

export default Create;

export async function getServerSideProps(ctx: any) {
    db.connectDb();
    const results = await Product.find().select("name subProducts").lean();
    const categories = await Category.find().lean();
    db.disconnectDb();

    return {
        props: {
            parents: JSON.parse(JSON.stringify(results)),
            categories: JSON.parse(JSON.stringify(categories)),
        },
    };
}
