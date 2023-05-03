import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { ErrorMessage, useField } from "formik";
import { useEffect, useState } from "react";
import { prominent } from "color.js";


const Colors = ({ product, setProduct, colorImage, colors, setColors, ...props }: any) => {
    const [field, meta] = useField(props);
    

    useEffect(() => {
        const fetchData = async () => {
            if (colorImage) {
                const result = await prominent(colorImage, {
                    format: "hex",
                    amount: 6,
                });
                setColors(result);
            }
        };
        fetchData();
    }, [colorImage]);

    return (
        <div className="flex flex-col mt-2">
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

            <input
                type="text"
                defaultValue={product.color.color}
                hidden
                name={field.name}
            />

            <div className="flex mt-2">
                {colors.map((color: any, id: any) => (
                    <div
                        style={{ backgroundColor: color }}
                        className="h-28 w-10  rounded-full m-1 cursor-pointer hover:scale-110 hover:shadow transition-all mr-2"
                        key={id}
                        onClick={() =>
                          setProduct((prevProduct: any) => ({
                            ...prevProduct,
                            color: { ...prevProduct.color, color },
                          }))
                        }
                        
                    >
                        <div className="text-sm text-white rotate-90 flex mt-9 opacity-70 hover:opacity-100">
                            {color}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Colors;
