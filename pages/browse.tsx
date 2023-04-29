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
import BrandsFilter from "@/components/browse/brandsFilter/BrandsFilter";
import StylesFilter from "@/components/browse/stylesFilter/StylesFilter";
import MaterialsFilter from "@/components/browse/materialsFilter/MaterialsFilter";
import GenderFilter from "@/components/browse/genderFilter/GenderFilter";
import HeadingFilter from "@/components/browse/headingFilter/HeadingFilter";
import { useRouter } from "next/router";

const browse = ({
    categories,
    subCategories,
    products,
    sizes,
    colors,
    brands,
    styles,
    materials,
}: any) => {
    const router = useRouter();

    const filter = ({
        search,
        category,
        brand,
        style,
        size,
        color,
        material,
        gender,
        price,
    }: any) => {
        const path = router.pathname;
        const { query } = router;
        if (search) query.search = search;
        if (category) query.category = category;
        if (brand) query.brand = brand;
        if (style) query.style = style;
        if (size) query.size = size;
        if (color) query.color = color;
        if (material) query.material = material;
        if (gender) query.gender = gender;
        if (price) query.price = price;
        router.push({
            pathname: path,
            query: query,
        });
    };

    const searchHandler = (search: any) => {
        if (search == "") {
            filter({ search: {} });
        } else {
            filter({ search });
        }
    };
    const categoryHandler = (category: any) => {
        filter({ category });
    };
    const brandHandler = (brand: any) => {
        filter({ brand });
    };
    const styleHandler = (style: any) => {
        filter({ style });
    };
    const sizeHandler = (size: any) => {
        filter({ size });
    };
    const colorHandler = (color: any) => {
        filter({ color });
    };
    const materialHandler = (material: any) => {
        filter({ material });
    };
    const genderHandler = (gender: any) => {
        if (gender == "Unisex") {
            filter({ gender: {} });
        } else {
            filter({ gender });
        }
    };
    const priceHandler = (price: any, type: any) => {
        let priceQuery = router.query.price?.split("_") || "";
        let min = priceQuery[0] || "";
        let max = priceQuery[1] || "";
        let newPrice = "";
        if(type == "min") {
            newPrice = `${price}_${max}`;
        } else {
            newPrice = `${min}_${price}`;
        }
        // setTimeout(() => {

            filter({price: newPrice});
            
        // },2000)
    };

    const multiPriceHandler = (min: any, max: any) => {
        filter({ price: `${min}_${max}` });
    };

    function checkChecked(queryName: any, value: any) {
        if(router.query?.[queryName]?.search(value) !== -1) {
            return true
        }
        return false;
    }

    return (
        <>
            <Header title={"Browse Products"} searchHandler={searchHandler} />
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

                <div className=" mt-4 grid grid-cols-5 gap-1 md:gap-5">
                    <div className=" h-[800px] md:col-span-1 flex flex-col md:items-center  overflow-y-auto overflow-x-hidden">
                        <button
                            className={`flex items-center justify-center w-56 md:w-full py-2 rounded transition-all duration-300 bg-amazon-blue_light text-white hover:scale-95 border-amazon-blue_dark`}
                        >
                            Clear All(3)
                        </button>
                        <CategoriesFilter
                            categories={categories}
                            subCategories={subCategories}
                            categoryHandler={categoryHandler}
                            checkChecked
                        />
                        <SizesFilter sizes={sizes} sizeHandler={sizeHandler} />
                        <ColorsFilter
                            colors={colors}
                            colorHandler={colorHandler}
                        />
                        <BrandsFilter
                            brands={brands}
                            brandHandler={brandHandler}
                        />
                        <StylesFilter
                            styles={styles}
                            styleHandler={styleHandler}
                        />
                        <MaterialsFilter
                            materials={materials}
                            materialHandler={materialHandler}
                        />
                        <GenderFilter genderHandler={genderHandler} />
                    </div>

                    <div className="md:col-span-4 flex flex-wrap content-start">
                        <HeadingFilter priceHandler={priceHandler} multiPriceHandler={multiPriceHandler} />
                        <div className="mt-6 flex flex-wrap items-start gap-4">
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
    const { query } = context;
    const searchQuery = query.search || "";
    const categoryQuery = query.category || "";
    const priceQuery = query.price?.split("_") || "";
    // --------------------------------------------------
    const brandQuery = query.brand?.split("_") || "";
    const brandRegex = `^${brandQuery[0]}`;
    const brandSearchRegex = createRegex(brandQuery, brandRegex);
    // --------------------------------------------------
    const styleQuery = query.style?.split("_") || "";
    const styleRegex = `^${styleQuery[0]}`;
    const styleSearchRegex = createRegex(styleQuery, styleRegex);
    // console.log(styleSearchRegex);
    // --------------------------------------------------
    const sizeQuery = query.size?.split("_") || "";
    const sizeRegex = `^${sizeQuery[0]}`;
    const sizeSearchRegex = createRegex(sizeQuery, sizeRegex);
    // console.log(sizeSearchRegex);
    // --------------------------------------------------
    const colorQuery = query.color?.split("_") || "";
    const colorRegex = `^${colorQuery[0]}`;
    const colorSearchRegex = createRegex(colorQuery, colorRegex);
    // console.log(sizeSearchRegex);
    // --------------------------------------------------
    const materialQuery = query.material?.split("_") || "";
    const materialRegex = `^${materialQuery[0]}`;
    const materialSearchRegex = createRegex(materialQuery, materialRegex);
    // console.log(sizeSearchRegex);
    // --------------------------------------------------
    // --------------------------------------------------
    const genderQuery = query.gender?.split("_") || "";
    const genderRegex = `^${genderQuery[0]}`;
    const genderSearchRegex = createRegex(genderQuery, genderRegex);
    // console.log(sizeSearchRegex);
    // --------------------------------------------------
    const search =
        searchQuery && searchQuery !== ""
            ? {
                  name: {
                      $regex: searchQuery,
                      $options: "i",
                  },
              }
            : {};
    const category =
        categoryQuery && categoryQuery !== ""
            ? { category: categoryQuery }
            : {};
    // const brand = brandQuery && brandQuery !== "" ? { brand: brandQuery } : {};
    const style =
        styleQuery && styleQuery !== ""
            ? {
                  "details.value": {
                      $regex: styleSearchRegex,
                      $options: "i",
                  },
              }
            : {};
    const size =
        sizeQuery && sizeQuery !== ""
            ? {
                  "subProducts.sizes.size": {
                      $regex: sizeSearchRegex,
                      $options: "i",
                  },
              }
            : {};
    const color =
        colorQuery && colorQuery !== ""
            ? {
                  "subProducts.color.color": {
                      $regex: colorSearchRegex,
                      $options: "i",
                  },
              }
            : {};
    const brand =
        brandQuery && brandQuery !== ""
            ? {
                  brand: {
                      $regex: brandSearchRegex,
                      $options: "i",
                  },
              }
            : {};
    const material =
        materialQuery && materialQuery !== ""
            ? {
                  "details.value": {
                      $regex: materialSearchRegex,
                      $options: "i",
                  },
              }
            : {};
    const gender =
        genderQuery && genderQuery !== ""
            ? {
                  "details.value": {
                      $regex: genderSearchRegex,
                      $options: "i",
                  },
              }
            : {};
    const price =
        priceQuery && priceQuery !== ""
            ? {
                  "subProducts.sizes.price": {
                      $gte: Number(priceQuery[0]) || 0,
                      $lte: Number(priceQuery[1]) || Infinity,
                  },
              }
            : {};
    // --------------------------------------------------
    function createRegex(data: any, styleRegex: any) {
        if (data.length > 1) {
            for (let i = 1; i < data.length; i++) {
                styleRegex += `|^${data[i]}`;
            }
        }
        return styleRegex;
    }
    // --------------------------------------------------
    db.connectDb();
    let productsDb = await Product.find({
        ...search,
        ...category,
        ...brand,
        ...style,
        ...size,
        ...color,
        ...material,
        ...gender,
        ...price,
    })
        .sort({ createdAt: -1 })
        .lean();
    let products = randomize(productsDb);
    let categories = await Category.find().lean();
    let subCategories = await SubCategory.find()
        .populate({ path: "parent", model: Category })
        .lean();
    let colors = await Product.find({ ...category }).distinct(
        "subProducts.color.color"
    );
    let brandsDb = await Product.find({ ...category }).distinct("brand");
    let sizes = await Product.find({ ...category }).distinct(
        "subProducts.sizes.size"
    );
    let details = await Product.find({ ...category }).distinct("details");
    let stylesDb = filterArray(details, "Style");
    let materialsDb = filterArray(details, "Material");
    let styles = removeDublicates(stylesDb);
    let materials = removeDublicates(materialsDb);
    let brands = removeDublicates(brandsDb);

    console.log("styles2 > ", styles);

    return {
        props: {
            categories: JSON.parse(JSON.stringify(categories)),
            products: JSON.parse(JSON.stringify(products)),
            subCategories: JSON.parse(JSON.stringify(subCategories)),
            sizes,
            colors,
            brands,
            styles,
            materials,
        },
    };
}
