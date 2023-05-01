import nc from "next-connect";
import db from "../../../utils/db";
import Product from "../../../models/Product";

const handler = nc();

handler.get(async (req, res) => {
    try {
        const id = req.query.id ;
        const style = req.query.style;
        const size = req.query.size;

        db.connectDb();
        const product = await Product.findById(id).lean();

        let discount = product.subProducts[style].discount;
        let priceBefore = product.subProducts[style].sizes[size].price;
        let price = discount ? priceBefore - priceBefore / discount : priceBefore;

        db.disconnectDb();

        return res.json({
            _id: product._id,
            style: Number(style),
            name: product.name,
            description: product.description,
            slug: product.slug,
            sku: product.subProducts[style].sku,
            brand: product.brand,
            shipping: product.shipping,
            images: product.subProducts[style].images,
            color: product.subProducts[style].color,
            size: product.subProducts[style].sizes[size].size,
            price,
            priceBefore,
            quantity: product.subProducts[style].sizes[size].qty,
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
