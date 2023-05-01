import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { ErrorMessage, useField } from "formik";
import Image from "next/image";
import { useState } from "react";
// import { ColorExtractor } from "react-color-extractor";

const Colors = ({ product, setProduct, colorImage, ...props }: any) => {
    const [colors, setColors] = useState([]);
    const [field, meta] = useField(props);

    const renderSwatches = () => {
        return colors.map((color: any, id: any) => (
            <div
                style={{ backgroundColor: color }}
                className="h-20 w-10  rounded-full m-1 cursor-pointer hover:scale-110 transition mr-2"
                key={id}
                onClick={() =>
                    setProduct({
                        ...product,
                        color: { color, image: product.color.image },
                    })
                }
            >
                <div className="text-xs text-white rotate-90 mt-6">{color}</div>
            </div>
        ));
    };

    return (
        <div className="flex flex-col mt-2">
            {/* {product.images > 0 ? ( */}
            <div className={`flex flex-col `}>
                <div
                    className={`${
                        meta?.error && meta.touched ? "text-red-500" : ""
                    } w-full flex items-center border-b pb-1`}
                >
                    {meta?.error && (
                        <ExclamationTriangleIcon className="w-7 h-7 mr-2" />
                    )}
                    <span className="font-semibold">Pick a Product Color</span>
                </div>
                <span>
                    {meta.touched && meta.error && (
                        <div className="text-red-500">
                            <span></span>
                            <ErrorMessage name={field.name} />
                        </div>
                    )}
                </span>
            </div>
            {/* ) : ''} */}

            <input
                type="text"
                defaultValue={product.color.color}
                hidden
                name={field.name}
            />

            {/* <div>infos</div> */}
            <div>
                {/* <ColorExtractor getColors={(colors: any) => setColors(colors)}>
                    <img
                        src={colorImage}
                        alt="color-image"
                        className="hidden w-10 h-10"
                    />
                </ColorExtractor> */}

                <div className="flex mt-2">{renderSwatches()}</div>
            </div>
        </div>
    );
};

export default Colors;
