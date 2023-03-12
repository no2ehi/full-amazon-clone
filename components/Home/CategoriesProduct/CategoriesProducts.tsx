import Image from "next/image";
import GridCategory from "./GridCategory";

const CategoriesProduct = ({ products, categories }: any) => {

    return (
        <div className="relative grid md:grid-cols-4 grid-flow-row-dense gap-4 -mt-16 sm:-mt-32 md:-mt-48 lg:-mt-80 z-10 p-4 bg-gradient-to-t from-gray-100 to-transparent">

            {/* categories grid */}
            <GridCategory indexCategory={categories[0]} products={products} gridCols={2}/>

            <GridCategory indexCategory={categories[1]} products={products} gridCols={1}/>

            <GridCategory indexCategory={categories[2]} products={products} gridCols={1}/>

            <GridCategory indexCategory={categories[3]} products={products} gridCols={2}/>

            <GridCategory indexCategory={categories[4]} products={products} gridCols={1}/>

            <GridCategory indexCategory={categories[5]} products={products} gridCols={2}/>

            <GridCategory indexCategory={categories[3]} products={products} gridCols={1}/>

            <GridCategory indexCategory={categories[5]} products={products} gridCols={1}/>
            

        </div>
    );
};

export default CategoriesProduct;
