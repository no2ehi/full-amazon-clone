import nc from "next-connect";
import db from "../../../../utils/db";
import Product from "../../../../models/Product";
import auth from "../../../../middleware/auth";

const handler = nc().use(auth);

handler.put(async (req, res) => {
    try {
        await db.connectDb();
        const product = await Product.findById(req.query.id);
        
        if (product) {
            const exist = product.reviews.find(
                (x) => x.reviewBy.toString() == req.user
            );
            if (exist) {
                await Product.updateOne(
                    {
                        _id: req.query.id,
                        "reviews._id": exist._id,
                    },
                    {
                        $set: {
                            "reviews.$.review": req.body.review,
                            "reviews.$.rating": req.body.rating,
                            "reviews.$.size": req.body.size,
                            "reviews.$.fit": req.body.fit,
                            "reviews.$.images": req.body.images,
                            "reviews.$.style": req.body.style,
                        },
                    },
                    {
                        new: true,
                    }
                );

                const updatedProduct = await Product.findById(req.query.id);
                updatedProduct.numberReviews = updatedProduct.reviews.length;
                updatedProduct.rating =
                    updatedProduct.reviews.reduce((a, r) => r.rating + a, 0) /
                    updatedProduct.reviews.length;

                await updatedProduct.save();
                await updatedProduct.populate("reviews.reviewBy");
                await db.disconnectDb();
                return res
                    .status(200)
                    .json({ reviews: updatedProduct.reviews.reverse() });
            } else {
                const review = {
                    reviewBy: req.user,
                    review: req.body.review,
                    rating: req.body.rating,
                    size: req.body.size,
                    fit: req.body.fit,
                    images: req.body.images,
                    style: req.body.style,
                };
                
                product.reviews.push(review);
                product.numberReviews = product.reviews.length;
                product.rating = product.reviews.reduce((a, r) => r.rating + a, 0) / product.reviews.length;
                await product.save();
                await product.populate("revews.revewBy");
                await db.disconnectDb();
                
                return res.status(200).json({ reviews: product.reviews.reverse() })
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
});


export default handler;