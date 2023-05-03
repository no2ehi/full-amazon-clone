import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./productCard/ProductCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper";

const HomeProductSwiper = ({ products, category }: any) => {
    let selectedProducts = products.filter(
        (p: any) => p.category.name === category
    );
    return (
        <div className="z-50 flex flex-col rounded bg-white h-auto mb-4 mx-4  p-4 border">
            <h4 className="font-bold text-xl mb-4">{category}</h4>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                slidesPerGroup={1}
                navigation={true}
                modules={[Navigation]}
                className="w-full products-swiper_home "
                breakpoints={{
                    640: {
                        slidesPerView: 5,
                        slidesPerGroup: 2
                    },
                }}
            >
                {selectedProducts.map((product: any, i: number) => (
                    <SwiperSlide key={i}>
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HomeProductSwiper;
