import { useAppDispatch } from "@/redux/hooks";
import { showDialog } from "@/redux/slices/DialogSlice";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { ErrorMessage, useField } from "formik";
import { useRef } from "react";

const Style = ({ product, setProduct, colorImage, ...props }: any) => {
    const dispatch = useAppDispatch();
    const fileInput = useRef<any>(null);
    const [field, meta] = useField(props);

    const handleImage = (e: any) => {
        let img = e.target.files[0];
        console.log('img', img)
        if (
            img.type !== "image/jpeg" &&
            img.type !== "image/png" &&
            img.type !== "image/webp"
        ) {
            dispatch(
                showDialog({
                    header: "unsupported Format.",
                    msgs: {
                        msg: `${img.name} format is unsupported! only Jpeg,Png,Webp are allowed.`,
                        type: "error",
                    },
                })
            );
            return;
        } else if (img.size > 1024 * 1024 * 10) {
            dispatch(
                showDialog({
                    header: "Unsupported size",
                    msgs: {
                        msg: `${img.name} size is too large, maximume of 10 mb allowed,`,
                        type: "error",
                    },
                })
            );
            return;
        } else {
            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = (e: any) => {
                let obj = {
                    color: product.color.color,
                    image: e.target.result,
                };
                setProduct({
                    ...product,
                    color: obj,
                });
            };
        }
    };

    return (
        <div className="flex flex-col">
        <div className={` ${meta.error ? "flex" : ""}`}>
            <div className="flex w-full">
                {meta.error && (<ExclamationTriangleIcon className="w-6 h-6" />)}
                <span className="w-full my-2 pb-2 border-b font-semibold">Pick a Product Style image</span>
            </div>
            <span>
                {meta.touched && meta.error && (
                    <div className="">
                        <span></span>
                        <ErrorMessage name={field.name} />
                    </div>
                )}
            </span>
        </div>

        <input
            type="file"
            name={field.name}
            ref={fileInput}
            hidden
            accept="image/jpeg, image/png, image/webp, image/gif"
            onChange={handleImage}
        />

        <button
            type="reset"
            className={`w-52 bg-slate-300 p-2 rounded `}
            onClick={() => fileInput.current?.click()}
        >
            Pic Style
        </button>
    </div>
    );
};

export default Style;
