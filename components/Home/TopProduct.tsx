import Image from "next/image";
import CarouselItemsProduct from "./CategoriesProduct/CarouselItemsProduct";

const TopProduct = ({ products, categories, title }: any) => {
    const randomIndexCategory = Math.floor(Math.random() * 10) + 1;
    let selectedProduct = products.filter((product: any) => product.category === categories);
    selectedProduct = selectedProduct.concat(selectedProduct)

    return ( 
        <div className="flex flex-col rounded bg-white h-[340px] mx-4 mb-4 p-4 border">
            <h4 className="font-bold text-xl mb-4">{title} {categories}</h4>
            <div className="">
                {/* <CarouselItemsProduct data={selectedProduct} /> */}
            </div>
        </div>
     );
}
 
export default TopProduct;