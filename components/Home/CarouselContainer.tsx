import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

import slider1 from "../../public/assets/images/slider-1.jpg";
import slider2 from "../../public/assets/images/slider-2.jpg";
import slider3 from "../../public/assets/images/slider-3.jpg";
import slider4 from "../../public/assets/images/slider-4.jpg";
import slider5 from "../../public/assets/images/slider-5.jpg";
import { CSSProperties } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";


const CarouselContainer = () => {
    const arrowStyles: CSSProperties = {
        position: "absolute",
        zIndex: 2,
        top: "calc(30% - 15px)",
        width: 50,
        height: 50,
        cursor: "pointer",
        filter: "drop-shadow(1px 3px 1px rgb(255 255 255 / 0.8))",
        color: "#404040",
    };

    return (
            <Carousel
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    hasPrev && (
                        <button
                            className=""
                            type="button"
                            onClick={onClickHandler}
                            title={label}
                            style={{ ...arrowStyles, left: 15 }}
                        >
                            <ChevronLeftIcon />
                        </button>
                    )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                    hasNext && (
                        <button
                            type="button"
                            onClick={onClickHandler}
                            title={label}
                            style={{ ...arrowStyles, right: 15 }}
                        >
                            <ChevronRightIcon />
                        </button>
                    )
                }
                showStatus={false}
                showArrows={true}
                infiniteLoop={true}
                emulateTouch={true}
                autoPlay={true}
                showIndicators={false}
                showThumbs={false}
            >
                <div>
                    <Image src={slider1} alt="slider1" />
                </div>
                <div>
                    <Image src={slider2} alt="slider1" />
                </div>
                <div>
                    <Image src={slider3} alt="slider1" />
                </div>
                <div>
                    <Image src={slider4} alt="slider4" />
                </div>
                <div>
                    <Image src={slider5} alt="slider5" />
                </div>
            </Carousel>
    );
};

export default CarouselContainer;
