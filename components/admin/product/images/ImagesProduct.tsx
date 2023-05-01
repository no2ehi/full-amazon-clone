import { useAppDispatch } from "@/redux/hooks";
import { showDialog } from "@/redux/slices/DialogSlice";
import { ErrorMessage, Field, useField } from "formik";
import { useRef } from "react";
import Image from "next/image";
import noImage from "../../../../public/assets/images/no-image.png";
import { ArrowsPointingInIcon, SwatchIcon, TrashIcon } from "@heroicons/react/24/outline";

const ImagesProduct = ({
    images,
    setImages,
    header,
    text,
    setColorImage,
    ...props
}: any) => {
    const dispatch = useAppDispatch();
    const fileInput = useRef<any>(null);
    const [field, meta] = useField(props);

    const handleImages = (e: any) => {
        let files = Array.from(e.target.files);
        files.forEach((img: any, i) => {
            if (images.length == 6) {
                console.log("err");
                dispatch(
                    showDialog({
                        header: "Maximum 6 images are allowed.",
                        msgs: {
                            msg: `Maximum of total 6 images are allowed.`,
                            type: "error",
                        },
                    })
                );
                return;
            }
            if (
                img.type !== "image/jpeg" &&
                img.type !== "image/png" &&
                img.type !== "image/webp"
            ) {
                dispatch(
                    showDialog({
                        header: "Unsupported Format!",
                        msgs: {
                            msg: `${img.name} format is unsupported? only jpeg,png,webp are allowed.`,
                            type: "error",
                        },
                    })
                );
                files = files.filter((item) => item !== img.name);
                return;
            } else if (img.size > 1024 * 1024 * 1024) {
                dispatch(
                    showDialog({
                        header: "Unsupported Format!",
                        msgs: {
                            msg: `${img.name} size is too large, maximum of 10mb allowed.`,
                            type: "error",
                        },
                    })
                );
                return;
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(img);
                reader.onload = (e: any) => {
                    setImages((images: any) => [...images, e.target.result]);
                };
            }
        });
    };

    const handleRmove = (image: any) => {
        setImages((images: any) => images.filter((item: any) => item !== image))
    }
    
    return (
        <div className="flex flex-col">
            <div className={` ${meta.error ? "flex" : ""}`}>
                <div className="flex">
                    {meta.error && "warning"}
                    <span className=" font-semibold">{header}</span>
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
                multiple
                accept="image/jpeg, image/png, image/webp, image/gif"
                onChange={handleImages}  
            />

            <div className="flex my-4">
                <div
                    className={`gap-2 ${
                        images.length == 2
                            ? "grid grid-cols-2"
                            : images.length == 2
                            ? "grid grid-cols-2"
                            : images.length == 3
                            ? "grid grid-cols-3"
                            : images.length == 4
                            ? "grid grid-cols-4"
                            : images.length == 5
                            ? "grid grid-cols-5"
                            : images.length == 6
                            ? "grid grid-cols-6"
                            : "grid grid-cols-6"
                    }`}
                >
                    {!images.length
                        ? (
                            <Image src={noImage} width={250} height={250} priority className="object-contain" alt="noimage" />
                        )
                        : images.map((img: any, i: number) => (
                              <div className="relative" key={i}>
                                  
                                  <div className="relative w-[200px] h-[200px]">
                                      <Image
                                          src={img}
                                          fill
                                          className="object-cover rounded"
                                          alt="image"
                                      />
                                  </div>
                                    <div className="absolute z-50 top-0 right-0 bottom-0 left-0 hover:bg-slate-600/[0.5] transition rounded duration-300 ">
                                      <div className="btn-edit-post z-50">
                                        <button onClick={() => handleRmove(img)}><TrashIcon className="w-6 h-6" /></button>
                                        <button onClick={() => setColorImage(img)}><SwatchIcon className="w-6 h-6" /></button>
                                        <button><ArrowsPointingInIcon className="w-6 h-6" /></button>
                                      </div>
                                    </div>
                              </div>
                          ))}
                </div>
            </div>

            <button
                type="reset"
                disabled={images.length == 6}
                className={`w-52 bg-slate-300 p-2 rounded ${
                    images.length == 6 && "opacity-50"
                }`}
                onClick={() => fileInput.current?.click()}
            >
                {text}
            </button>
        </div>
    );
};

export default ImagesProduct;
