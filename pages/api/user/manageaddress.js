import nc from "next-connect";
import db from "../../../utils/db";
import User from "../../../models/User";
import auth from "../../../middleware/auth";

const handler = nc().use(auth);

handler.put(async (req, res) => {
    try {
        db.connectDb;
        const { id } = req.body;
        const user = await User.findById(req.user);
        let user_addresses = user.address;
        let addresses = [];

        for (let i = 0; i < user_addresses.length; i++) {
            let temp_addresses = {};
            if (user_addresses[i]._id == id) {
                temp_addresses = {
                    ...user_addresses[i].toObject(),
                    active: true,
                };
                addresses.push(temp_addresses);
            } else {
                temp_addresses = {
                    ...user_addresses[i].toObject(),
                    active: false,
                };
                addresses.push(temp_addresses);
            }
        }

        const result = await user.updateOne(
            { address: addresses },
            { new: true }
        );

        db.disconnectDb();
        return res.json({ addresses });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

handler.delete(async (req, res) => {
    try {
        db.connectDb();
        const { id } = req.body;
        const user = await User.findById(req.user);
        await user.updateOne(
            {
                $pull: {
                    address: { _id: id },
                },
            },
            { new: true }
        );

        db.disconnectDb();
        return res.json({ addresses: user.address.filter((a) => a._id != id) });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default handler;
