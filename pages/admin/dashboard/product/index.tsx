import Layout from "@/components/admin/layout/Layout";
import Category from "@/models/Category";
import Product from "@/models/Product";
import db from "@/utils/db";
import AllProduct from "@/components/admin/product/index";

const Products = ({ products }: any) => {
    // console.log('products: ', products)
    return (
        <Layout>
            <AllProduct products={products} />
        </Layout>
    );
};

export default Products;

export const getServerSideProps = async (ctx: any) => {
    await db.connectDb();
    const products = await Product.find({})
        .populate({ path: "category", model: Category })
        .sort({ updatedAt: -1 })
        .lean();
    await db.disconnectDb();

    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
        },
    };
};
