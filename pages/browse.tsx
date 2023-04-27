import Category from "@/models/Category";
import Product from "@/models/Product";
import SubCategory from "@/models/SubCategory";
import db from "@/utils/db";
import { filterArray, removeDublicates, randomize } from "@/utils/array_utils";
import Header from "@/components/Header/Header";
import Link from "next/link";
import ProductCard from "@/components/Home/productCard/ProductCard";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import CategoriesFilter from "@/components/browse/categoriesFilter/CategoriesFilter";
import SizesFilter from "@/components/browse/sizesFilter/SizesFilter";
import ColorsFilter from "@/components/browse/colorsFilter/ColorsFilter";

const browse = ({ categories,subCategories, products,sizes,colors }: any) => {
    return (
        <>
            <Header title={"Browse Products"} />
            <div className="max-w-screen-2xl mx-auto bg-slate-100 p-1 md:p-6 gap-2">

                <div className="flex items-center text-sm">
                    <span className="text-slate-700">Home</span>
                    <ChevronRightIcon className="w-4 h-4 mx-1 fill-slate-600 " />
                    <span className="text-slate-700">Browse</span>
                </div>

                <div className="mt-2 flex gap-3 flex-wrap">
                    {categories.map((c: any) => (
                        <Link
                            className="flex items-center justify-center w-56 h-10 border bg-white rounded  transition-all duration-300 hover:bg-amazon-blue_light hover:text-white hover:scale-95 hover:border-amazon-blue_dark"
                            href={c.name}
                            key={c._id}
                        >
                            {c.name}
                        </Link>
                    ))}
                </div>

                <div className="mt-4 grid grid-cols-5 gap-1 md:gap-5">

                    <div className="flex flex-col md:items-center">

                        <button className={`flex items-center justify-center w-56 h-10 rounded transition-all duration-300 bg-amazon-blue_light text-white hover:scale-95 border-amazon-blue_dark`}>Clear All(3)</button>
                        <CategoriesFilter categories={categories} subCategories={subCategories} />
                        <SizesFilter sizes={sizes} />
                        <ColorsFilter colors={colors} />
                    </div>
                    
                    <div className="md:col-span-4 flex flex-wrap gap-3">
                        <div>other filter</div>
                        <div className="flex flex-wrap gap-4">
                            {products.map((product: any) => (
                                <ProductCard
                                    product={product}
                                    key={product._id}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default browse;

export async function getServerSideProps(context: any) {
    db.connectDb();
    let productsDb = await Product.find().sort({ createdAt: -1 }).lean();
    let products = randomize(productsDb);
    let categories = await Category.find().lean();
    let subCategories = await SubCategory.find()
        .populate({ path: "parent", model: Category })
        .lean();
    let colors = await Product.find().distinct("subProducts.color.color");
    let brandsDb = await Product.find().distinct("brand");
    let sizes = await Product.find().distinct("subProducts.sizes.size");
    let details = await Product.find().distinct("details");
    let stylesDb = filterArray(details, "Style");
    let patternsDb = filterArray(details, "Pattern Type");
    let materialsDb = filterArray(details, "Material");
    let styles = removeDublicates(stylesDb);
    let patters = removeDublicates(patternsDb);
    let materials = removeDublicates(materialsDb);

    // console.log('materialsDb db > ', materialsDb);
    // console.log('style db > ', stylesDb);
    // console.log('sizes > ', sizes);
    // console.log('sizes randomize > ', randomize(styles));

    return {
        props: {
            categories: JSON.parse(JSON.stringify(categories)),
            products: JSON.parse(JSON.stringify(products)),
            subCategories: JSON.parse(JSON.stringify(subCategories)),
            sizes,
            colors
        },
    };
}
