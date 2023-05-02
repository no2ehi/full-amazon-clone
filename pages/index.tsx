import CarouselContainer from "@/components/Home/CarouselContainer";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import MenuSideBar from "@/components/Header/MenuSidebar";
import Product from "@/models/Product";
import Category from "@/models/Category";
import HomeProductSwiper from "@/components/Home/HomeProductSwiper";
import CategoriesProduct from "@/components/Home/CategoriesProduct/CategoriesProducts";
import db from "../utils/db";

export default function Home({ products }: any) {
    return (
        <>
            <Header title="Full Amazon Clone React" />
            <main className="max-w-screen-2xl mx-auto bg-gray-100">
                <CarouselContainer />
                <CategoriesProduct
                    products={products}
                />
                <div className="z-10 relative">
                    <HomeProductSwiper
                        products={products}
                        category="women clothing"
                    />
                    <HomeProductSwiper products={products} category="shoes" />
                    <HomeProductSwiper products={products} category="Beauty" />
                    <HomeProductSwiper products={products} category="Kids" />
                </div>
            </main>
            <Footer />
            <MenuSideBar />
        </>
    );
}

export const getServerSideProps = async (context: any) => {
    db.connectDb();
    const products = await Product.find()
        .populate({ path: "category", model: Category })
        .sort({ updatedAt: -1 })
        .lean();
    db.disconnectDb();
    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
        },
    };
};
