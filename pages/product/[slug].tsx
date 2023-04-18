import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import MenuSideBar from "@/components/Header/MenuSidebar";
import ProductPage from "@/components/ProductPage/ProductPage";
import db from "@/utils/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";
import User from "@/models/User";


const SingleProduct = ({ product }: any) => {
    console.log(product);
    return (
        <>
            <Header title={product.name} />
            <main className="bg-white w-full">
                <ProductPage product={product} />
            </main>
            <Footer />
            <MenuSideBar />
        </>
    );
};

export default SingleProduct;

export const getServerSideProps = async (context: any) => {
    const { query } = context;
    const slug = query.slug;
    const style = query.style || 0;
    const size = query.size || 0;
    db.connectDb();
    let product = await Product.findOne({ slug })
        .populate({ path: "category", model: Category })
        .populate({ path: "subCategories", model: SubCategory })
        .populate({ path: "reviews.reviewBy", model: User })
        .lean();
    let subProduct = product.subProducts[style];
    let prices = subProduct.sizes
        .map((s: any) => s.price)
        .sort((a: any, b: any) => a - b);

    let newProduct = {
        ...product,
        images: subProduct.images,
        sizes: subProduct.sizes,
        discount: subProduct.discount,
        sku: subProduct.sku,
        colors: product.subProducts.map((p: any) => p.color),
        priceRange:
            prices.discount > 1
                ? `From ${(prices[0] - prices[0] / subProduct.discount).toFixed(
                      2
                  )} to ${(
                      prices[prices.length - 1] -
                      prices[prices.length - 1] / subProduct.discount
                  ).toFixed(2)} `
                : `From ${prices[0]} to ${prices[prices.length - 1]}$`,
        price:
            subProduct.discount > 0
                ? (
                      subProduct.sizes[size].price -
                      subProduct.sizes[size].price / subProduct.discount
                  ).toFixed(2)
                : subProduct.sizes[size].price,
        priceBefore: subProduct.sizes[size].price,
        quantity: subProduct.sizes[size].qty,
        ratings: [
            {
                percentage: 76,
            },
            {
                percentage: 14,
            },
            {
                percentage: 6,
            },
            {
                percentage: 4,
            },
            {
                percentage: 0,
            },
        ],
        allSizes: product.subProducts
            .map((p: any) => p.sizes)
            .flat()
            .sort((a: any, b: any) => (a.size - b.size))
            .filter(
                (element: any, index: any, array: any) =>
                    (array.findIndex((el2: any) => el2.size === element.size) === index)
            ),
    };
    db.disconnectDb();

    return {
        props: {
            product: JSON.parse(JSON.stringify(newProduct)),
        },
    };
};
