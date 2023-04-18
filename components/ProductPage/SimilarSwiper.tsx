import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { similarProducts } from "./similarProducts";

import "swiper/css";
import 'swiper/css/navigation';
import Link from "next/link";
import Image from "next/image";

const SimilarSwiper = () => {
    return (
        <div className="my-1 mx-2">
            <h4 className="mb-2 font-semibold border-b pb-1">Similar Product</h4>
            <Swiper
            slidesPerView={4}
            spaceBetween={1}
            slidesPerGroup={3}
            navigation={true}
            modules={[Navigation]}
            className="products-swiper"
        >
            {similarProducts.map((p: any, i: any) => (
                <SwiperSlide key={i}>
                    <Link href={`/`} >
                        <Image src={p} alt={p} width={150} height={150} className=""/>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
        </div>
    );
};

export default SimilarSwiper;
