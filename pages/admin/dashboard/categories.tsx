import Layout from "@/components/admin/layout/Layout";
import db from "../../../utils/db";
import Category from "../../../models/Category";
import { useState } from "react";
import CreateCategory from "@/components/admin/categories/CreateCategory";


const Categories = ({ categories }: any) => {
    const [data, setData] = useState(categories);

    return (
        <Layout>
            <CreateCategory setCategories={setData} />
            <div className="mt-4">
                {data?.map((cat: string, i: number) => (
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

    return {
        props: {
            categories: JSON.parse(JSON.stringify(categories))
        }
    }
}