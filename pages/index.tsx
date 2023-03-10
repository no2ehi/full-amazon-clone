import CarouselContainer from "@/components/CarouselContainer";
import Header from "@/components/Header";
import HomeCategoriesProducts from "@/components/HomeCategoriesProduct/HomeCategoriesProducts";
import MenuSideBar from "@/components/MenuSidebar";
import TopProduct from "@/components/TopProduct";
import Head from "next/head";

export default function Home({ products, categories }: any) {

    return (
        <>
            <Head>
                <title>Full Amazon Clone React</title>
                <meta name="description" content="full amazon clone React" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <Header />
            <main className="max-w-screen-2xl mx-auto bg-gray-100">
                <CarouselContainer />
                <HomeCategoriesProducts
                    products={products}
                    categories={categories}
                />
                <TopProduct products={products} categories={categories} title="Top Seller" />
                <TopProduct products={products} categories={categories} title="Popular items in" />
            </main>
            <MenuSideBar />
        </>
    );
}

export const getServerSideProps = async (context: any) => {
    const products = await fetch("https://dummyjson.com/products?limit=100").then((res) =>
        res.json()
    );

    const categories = await fetch(
        "https://dummyjson.com/products/categories"
    ).then((res) => res.json());

    return {
        props: {
            products: products.products,
            categories: categories,
        },
    };
};
