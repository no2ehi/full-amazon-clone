import nc from "next-connect";
import db from "../../../utils/db";
import User from "../../../models/User"
import auth from "../../../middleware/auth";

const handler = nc().user(auth);

handler.post( async (req, res) => {     
    try {
        db.connectDb;
        const {address, user_id } = req.body;
        const user = User.findById(user_id);
        await user.updateOne({
            $push: {
                address: address,
            }
        }, {new: true})
        db.disconnectDb();
        res.json(address);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

export default handler;