import Link from "next/link";
import { useState } from "react";
import AccoridanProduct from "./AccoridanProduct";
import BreadCrumb from "./BreadCrumb";
import Infos from "./Infos";
import InfosShipping from "./InfosShipping";
import MainSwiper from "./MainSwiper";
import Reviews from "./reviews/Reviews";
import SimilarSwiper from "./SimilarSwiper";

const ProductPage = ({ product }: any) => {
    const [activeImg, setActiveImg] = useState("");
    // console.log("active: ", activeImg);

    return (
        <div className="w-full bg-white h-auto px-3 mb-6 md:px-2">
            <BreadCrumb
                category={product.category}
                subCategories={product.subCategories}
            />
            <div className="grid grid-row-8 md:grid-cols-8 gap-4">
                <MainSwiper images={product.images} activeImg={activeImg} />
                <Infos product={product} setActiveImg={setActiveImg} />
                <InfosShipping product={product} />
            </div>

            <div className="mt-2 mx-auto w-full md:w-[700px] p-2 border rounded-lg">
                <SimilarSwiper />
            </div>
            <Reviews product={product} />
        </div>
    );
};

export default ProductPage;
