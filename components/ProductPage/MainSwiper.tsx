import Image from "next/image";
import { useState } from "react";

const MainSwiper = ({ images, activeImg }: any) => {
    const [active, setActive] = useState(0);

    return (
        <div className="flex flex-col md:col-span-3 md:flex-row-reverse px-2">
            <div className="flex-grow relative">
                <Image
                    src={activeImg || images[active].url}
                    alt={images[active].url}
                    width={400}
                    height={400}
                    className="object-cover"
                />
            </div>
            <div className="flex max-md:mt-2 md:mr-2 md:flex-col gap-2">
                {images.map((img: any, i: number) => (
                    <div
                        key={img.url}
                        className={`cursor-pointer gap-2 relative w-10 ${
                            i === active &&
                            "outline outline-1 outline-offset-2 outline-slate-600 rounded"
                        }`}
                        onMouseOver={() => setActive(i)}
                    >
                        <Image className="rounded" width={50} height={50} src={img.url} alt={img.url} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainSwiper;
