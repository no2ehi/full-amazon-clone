import DialogModal from "@/components/dialogModal";
import { useAppDispatch } from "@/redux/hooks";
import { showDialog } from "@/redux/slices/DialogSlice";
import { uploadImages } from "@/request/upload";
import dataURItoBlob from "@/utils/dataURItoBlob";
import { Rating } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import ImagesReview from "./Images";
import Select from "./Select";

let fits = ["Small", "True to size", "Large"];

const AddReview = ({ product, setReviews }: any) => {
    const dispatch = useAppDispatch();
    const [size, setSize] = useState("");
    const [style, setStyle] = useState("");
    const [fit, setFit] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [images, setImages] = useState([]);
    let uploaded_images: any = [];

    const handleSubmit = async () => {
        let msgs = [];
        if (!size) {
            msgs.push({
                msg: "Please select a size!",
                type: "error",
            });
        }
        if (!style) {
            msgs.push({
                msg: "Please select a style!",
                type: "error",
            });
        }
        if (!fit) {
            msgs.push({
                msg: "Please select a Fit!",
                type: "error",
            });
        }
        if (rating == 0) {
            msgs.push({
                msg: "Please select a rating!",
                type: "error",
            });
        }
        if (!review) {
            msgs.push({
                msg: "Please add a review!",
                type: "error",
            });
            return;
        }
        if (msgs.length > 0) {
            dispatch(
                showDialog({
                    header: "Adding review error!",
                    msgs,
                })
            );
            return;
        } if (images.length > 0) {
            let temp: any = [];
            if (images.length > 0) {
                temp = images.map((img: any) => dataURItoBlob(img));
            }
            const path: any = "review images";
            let formData = new FormData();
            formData.append("path", path);
            temp.forEach((img: any) => {
                formData.append("file", img);
            });
            uploaded_images = await uploadImages(formData);
            console.log(uploaded_images);
        }
        else {
            const { data } = await axios.put(`/api/product/${product._id}/review`, {
                size,
                style,
                fit,
                rating,
                review,
                images: uploaded_images,
            });
            setReviews(data.reviews);
            setSize("");
            setStyle("");
            setFit("");
            setRating(0);
            setImages([]);
            setReview("")
        }
    };

    return (
        <div className="flex flex-col">
            <DialogModal />
            <div className="flex flex-wrap max-md:space-y-4 mt-2">
                <Select
                    property={size}
                    text="size"
                    data={product.allSizes.filter(
                        (item: any) => item.size !== size
                    )}
                    handleChange={setSize}
                />
                <Select
                    property={style}
                    text="style"
                    data={product.colors.filter((item: any) => item !== style)}
                    handleChange={setStyle}
                />
                <Select
                    property={fit}
                    text="fit"
                    data={fits.filter((item: any) => item !== fit)}
                    handleChange={setFit}
                />
            </div>
            <ImagesReview images={images} setImages={setImages} />
            <textarea
                className="mt-4 p-3 w-full rounded-md bg-white h-[200px] border border-slate-200 outline-none resize-none"
                name="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write you review here..."
            ></textarea>
            <div className="flex flex-col md:flex-row items-center md:space-x-10">
                <Rating
                    className="mt-4"
                    name="half-rating-read"
                    defaultValue={0}
                    value={rating}
                    precision={0.5}
                    onChange={(e: any) => setRating(e.target.value)}
                    style={{ color: "#FACF19", fontSize: "3rem" }}
                />
                <button
                    onClick={() => handleSubmit()}
                    className="w-full mt-4 bg-gradient-to-r from-amazon-orange to-yellow-300 p-3 text-amazon-blue_dark font-semibold rounded-md hover:scale-95 transition"
                >
                    Submit Review
                </button>
            </div>
        </div>
    );
};

export default AddReview;
