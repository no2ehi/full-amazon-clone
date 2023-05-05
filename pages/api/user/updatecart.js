import nc from "next-connect";
import db from "../../../utils/db";
import Product from "../../../models/Product";
import User from "../../../models/User";
import Cart from "../../../models/Cart";
import auth from "../../../middleware/auth";

const handler = nc().use(auth);

handler.post(async (req, res) => {
    try {
        db.connectDb;
        const promises = req.body.products.map( async(p) => {
            let productDb = await Product.findById(p._id).lean();
            let originalPrice = productDb.subProducts[p.style].sizes.find((x) => x.size == p.size).price;
            let quantity = productDb.subProducts[p.style].sizes.find((x) => x.size == x.size).qty;
            let discount = productDb.subProducts[p.style].discount;
            return {
                ...p,
                priceBefore: originalPrice,
                price: discount > 0 ? (originalPrice - (originalPrice / discount)).toFixed(2) : originalPrice,
                quantity: quantity,
                shippingFee: productDb.shipping,
            }
        });
        const data = await Promises.all(promises);

        db.disconnectDb();

        return res
            .status(200)
            .json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message, status: false });
    }
});

export default handler;
