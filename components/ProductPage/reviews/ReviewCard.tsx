import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { Rating } from "@mui/material";
import Image from "next/image";

const ReviewCard = ({ review }: any) => {
    const { name, image } = review.reviewBy;
    return (
        <div className="grid md:grid-cols-10 mb-4">
            <div className="col-span-1 flex flex-col items-center mt-1">
                <Image
                    src={image}
                    width={55}
                    height={55}
                    alt={name}
                    className="rounded-xl outline outline-1 outline-offset-2 outline-slate-300"
                />
                <span className="mt-2 font-semibold">{name}</span>
                {/* <span className="mt-2 font-xs text-slate-500">{review.updatedAt}</span> */}
            </div>
            <div className="col-span-9 flex bg-white border rounded-xl px-5 py-3">
                <div className="mr-6 mt-1 w-[75px] ">
                    <Image
                        src={review.style.image}
                        width={70}
                        height={70}
                        alt={name}
                        className="rounded-xl outline outline-1 outline-offset-2 outline-slate-300"
                    />
                </div>
                <div className="flex flex-col w-full">
                    <div className="border-b pb-1 border-slate-100 flex items-center text-sm text-slate-600">
                        <Rating
                            name="half-rating-read"
                            readOnly
                            defaultValue={review.rating}
                        />
                        <span className="ml-4">Size: {review.size}</span>
                        <span className="ml-4">Fit: {review.fit}</span>
                        <div className="ml-auto ">
                            <HandThumbUpIcon className="h-6 2-6 mr-4 cursor-pointer" />
                            <span>{review.likes.likes}</span>
                        </div>
                    </div>
                    <div className="flex">
                        <p className="flex flex-grow mt-2 text-slate-800 tracking-wide	">
                            {review.review}
                        </p>
                        <span className="m-4 flex justify-end space-x-5 w-52">
                            {review.images &&
                                review.images.map((img: any, i: any) => (
                                    <Image
                                        key={i}
                                        src={img.url}
                                        width={50}
                                        height={50}
                                        alt={img.url}
                                        className="rounded-xl outline outline-1 outline-offset-2 outline-slate-300 cursor-pointer"
                                    />
                                ))}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
