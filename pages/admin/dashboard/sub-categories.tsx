import { useState } from "react";
import Layout from "@/components/admin/layout/Layout";
import CreateSubCategory from "@/components/admin/subcategory/CreateSubCategory";

import db from "../../../utils/db";
import Category from "../../../models/Category";
import SubCategory from "../../../models/SubCategory";


const Categories = ({ categories, subCategories }: any) => {
    const [data, setData] = useState(subCategories);
    console.log('inja subcat:', data)

    return (
        <Layout>
            <CreateSubCategory setSubCategories={setData} categories={categories} />
            <div className="mt-4">
                {data?.map((cat: any, i: number) => (
                    <div key={i}>{cat.name}</div>
                ))}
            </div>
        </Layout>
    );
};

export default Categories;


export async function getServerSideProps(context: any) {
    db.connectDb();
    const categories = await Category.find({}).sort({updatedAt: -1}).lean();
    const subCategories = await SubCategory.find({}).sort({updatedAt: -1}).lean();
    
    return {
        props: {
            categories: JSON.parse(JSON.stringify(categories)),
            subCategories: JSON.parse(JSON.stringify(subCategories)),
        }
    }
}