import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import MenuSideBar from "@/components/Header/MenuSidebar";
import Product from "@/components/ProductPage/Product";

const ProductPage = ({
    product
}: any) => {
    console.log(product)
    return ( 
        <>
        <Header />
        <main className="bg-white w-full">
            <Product product={product}/>
        </main>
        <Footer />
        <MenuSideBar />
        </>
     );
}
 
export default ProductPage;

export const getServerSideProps = async (context: any) => {
    const { query } = context;
    console.log('context: ', query.slug[0]);

    const product = await fetch(`https://dummyjson.com/products/${query.slug[0]}`)
    .then( (res) => res.json())
    console.log(product)
    return {
        props: {
            product
        }
    }
}