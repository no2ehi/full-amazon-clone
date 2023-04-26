import nc from "next-connect";
import db from "../../../utils/db";
import User from "../../../models/User";
import auth from "../../../middleware/auth";

const handler = nc().use(auth);

handler.put(async (req, res) => {
    try {
        db.connectDb;
        const { paymentMethod } = req.body;
        // console.log("back pay . ", req.body);
        const user = await User.findById(req.user);
        await user.updateOne(
            {
                defaultPaymentMethod: paymentMethod,
            },
            { returnOriginal: false }
        );
        db.disconnectDb();
        return res.json({ paymentMethod: user.defaultPaymentMethod });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default handler;
