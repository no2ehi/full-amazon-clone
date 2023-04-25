import nc from "next-connect";
import db from "../../../utils/db";
import User from "../../../models/User";
import Coupon from "../../../models/Coupon";
import Cart from "../../../models/Cart";
import auth from "../../../middleware/auth";

const handler = nc().use(auth);

handler.post(async (req, res) => {
    try {
        db.connectDb;
        const { coupon } = req.body;
        const user = await User.findById(req.user);
        const checkCoupon = await Coupon.findOne({ coupon });
        if (checkCoupon == null) {
            return res.status(400).json({ message: "Invalid Coupon." });
        }
        const { cartTotal } = await Cart.findOne({ user: req.user });
        let totalAfterDiscount = (
            (cartTotal * checkCoupon.discount) /
            100
        ).toFixed(2);
        
        await Cart.findOneAndUpdate(
            { user: user._id },
            { totalAfterDiscount },
            { new: true }
        );
        
        db.disconnectDb();

        return res.json({ totalAfterDiscount, discount: checkCoupon.discount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default handler;
