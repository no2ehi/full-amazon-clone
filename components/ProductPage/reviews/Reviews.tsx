import { Rating } from "@mui/material";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import AddReview from "./AddReview";
import Table from "./Table";

const Reviews = ({ product }: any) => {
    const { data: session } = useSession();
    const [reviews, setReviews] = useState(product.reviews)
    // console.log('product review: ',reviews);
    return (
        <div className="mt-4 bg-slate-100 mx-auto w-full md:w-4/5 p-4 border rounded-md">
            <h3 className="mb-2 font-bold text-2xl">
                Customer Reviews ({product.reviews.length})
            </h3>
            <div className="grid md:grid-cols-2">
                <div className="flex max-md:items-center md:flex-col md:justify-center">
                    <span className="text-sm font-semibold">Average Rating</span>
                    <div className="mt-2 max-md:ml-auto flex items-center text-m font-semibold">
                        <Rating
                            name="half-rating-react"
                            value={product.rating}
                            precision={0.5}
                            readOnly
                            style={{ color: "#FACF19 " }}
                        />
                        <span className="ml-2">
                            {product.rating === 0
                                ? "No review yet."
                                : product.rating.toFixed(2)}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col mt-4">
                    {product.ratings.map((rating: any, i: any) => (
                        <div
                            className="flex items-center space-x-4 max-md:mb-3"
                            key={i}
                        >
                            <Rating
                                name="half-rating-react"
                                defaultValue={5 - i}
                                readOnly
                                style={{ color: "#FACF19 " }}
                            />
                            <div className="flex items-center bg-slate-300 w-full md:w-56 h-1.5 rounded-full">
                                <div
                                    className="bg-red-500 h-1.5 rounded-full"
                                    style={{
                                        width: `${rating.percentage}%`,
                                    }}
                                ></div>
                            </div>
                            <span className="text-sm font-semibold">
                                {rating.percentage}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            {session ? (
                <AddReview product={product} setReviews={setReviews} />
            ) : (
                <button
                    onClick={() => signIn()}
                    className="mt-4 w-full bg-amazon-orange font-semibold px-4 py-2 rounded"
                >
                    Login to add review
                </button>
            )}
            {
                reviews.length > 0 && (
                    <Table reviews={reviews} allSizes={product.allSizes} colors={product.colors} />
                )
            }
        </div>
    );
};

export default Reviews;
