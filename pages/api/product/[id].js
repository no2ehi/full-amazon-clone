import nc from "next-connect";
import db from "../../../utils/db";
import Product from "../../../models/Product";

const handler = nc();

handler.get(async (req, res) => {
    try {
        const id = req.query.id ;
        db.connectDb();
        
        const product = await Product.findById(id).lean();
        db.disconnectDb();

        return res.json({
            _id: product._id,
            name: product.name,
            description: product.description,
            slug: product.slug,
            // sku: product.sku,
            brand: product.brand,
            shipping: product.shipping,
            category: product.category,
            subCategories: product.subCategories,
            questions: product.questions,
            details: product.details,
        });
        // console.log("in id product.", id);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default handler;
