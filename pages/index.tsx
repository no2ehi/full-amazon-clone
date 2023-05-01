import CarouselContainer from "@/components/Home/CarouselContainer";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import MenuSideBar from "@/components/Header/MenuSidebar";
import { useSession } from "next-auth/react";
import Product from "@/models/Product";
import Category from "@/models/Category";
import HomeProductSwiper from "@/components/Home/HomeProductSwiper";
import CategoriesProduct from "@/components/Home/CategoriesProduct/CategoriesProducts";

export default function Home({ products }: any) {
    const { data: session } = useSession();
    // console.log("session: ", session);

    // console.log("all product: ", allProduct);

    return (
        <>
            <Header title="Full Amazon Clone React" />
            <main className="max-w-screen-2xl mx-auto bg-gray-100">
                <CarouselContainer />
                {/* <CategoriesProduct
                    products={products}
                    categories={categories}
                /> */}
                <div className="z-50 md:-mt-72 relative">
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
    const products = await Product.find()
        .populate({ path: "category", model: Category })
        .sort({ updatedAt: -1 })
        .lean();

    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
            // products2: products2,
            // categories: categories,
        },
    };
};
