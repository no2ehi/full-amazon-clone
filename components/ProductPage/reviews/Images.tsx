import { MinusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRef, useState } from "react";

const ImagesReview = ({ images, setImages }: any) => {
    const [error, setError] = useState("");
    const inputRef = useRef(null);

    const handleImages = (e: any) => {
        let files = Array.from(e.target.files);
        files.forEach((img: any, i: any) => {
            if (images.length == 3 || i == 2) {
                setError("Maximum 3 images are allowed.");
                return;
            }
            if (
                img.type !== "image/jpeg" &&
                img.type !== "image/png" &&
                img.type !== "image/webp"
            ) {
                setError(
                    `${img.name} format is unsupported! only JPEG, PNG, WEBP are allowed.`
                );
                files = files.filter((item: any) => item.name !== img.name);
                return;
            } else if (img.size > 1024 * 1024) {
                setError(`${img.name} size is too large, max 5MB allowed.`);
                files = files.filter((item: any) => item.name !== img.name);
            } else {
                setError("");
                const reader = new FileReader();
                reader.readAsDataURL(img);
                reader.onload = (e: any) => {
                    setImages((images: any) => [...images, e.target.result]);
                };
            }
        });
    };

    const removeImg = (image: any) => {
        setImages((images: any) => images.filter((img: any) => img !== image));
        if (images.length <= 3) {
            {
                setError("");
            }
        }
    };

    return (
        <div className="mt-5 grid md:grid-cols-4 ">
            <div className="flex flex-col justify-center">
                <input
                    type="file"
                    ref={inputRef}
                    hidden
                    multiple
                    onChange={handleImages}
                    accept="image/png,image/jpeg,image/webp"
                />
                <button
                    className="bg-amazon-blue_light md:w-52 p-2 text-white rounded-md hover:scale-95 transition"
                    onClick={() => inputRef.current?.click()}
                >
                    Add Images
                </button>
                <span className="text-red-500 text-sm mt-2">{error}</span>
            </div>
            <div className="flex max-md:mt-4 md:col-span-3">
                {images.length > 0 &&
                    images.map((img: any, i: any) => (
                        <span className="relative mx-2" key={i}>
                            <span className=" bg-slate-300 p-1 rounded-full absolute -top-3 -right-2  z-10 shadow-md transition cursor-pointer hover:bg-slate-400">
                                <MinusIcon
                                    className="w-4 h-4"
                                    onClick={() => removeImg(img)}
                                />
                            </span>
                            <Image
                                src={img}
                                alt={img}
                                width={100}
                                height={50}
                                className="rounded-md  outline hover:outline-1 hover:outline-offset-2 hover:outline-slate-500 transition cursor-pointer"
                            />
                        </span>
                    ))}
            </div>
        </div>
    );
};

export default ImagesReview;
