import nc from "next-connect";
import db from "../../../utils/db";
import User from "../../../models/User";
import auth from "../../../middleware/auth";
import bcrypt from "bcrypt";

const handler = nc().use(auth);

handler.put(async (req, res) => {
    try {
        db.connectDb;
        const { current_password, new_password } = req.body;
        const user = await User.findById(req.user);
        const crypted_password = await bcrypt.hash(new_password, 12);
        // if user login with social media
        if (!user.password) {
            console.log("why");
            await user.updateOne({
                password: crypted_password,
            });
            return res
                .status(200)
                .json({
                    message:
                        "we noticed that you are using a social login, so we added a password to login in the future.",
                });
        }
        const isMatch = await bcrypt.compare(current_password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ message: "current password is wrong!" });
        }

        await user.updateOne({
            password: crypted_password,
        });
        db.disconnectDb();
        return res
            .status(200)
            .json({ message: "Password has been changes successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default handler;
