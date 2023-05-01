import nc from "next-connect";
import db from "../../../utils/db";
import User from "../../../models/User";
import bcrypt from "bcrypt";

const handler = nc();

handler.put( async (req, res) => {
    try {
        await db.connectDb();
        const { userId, password } = req.body;
        // console.log(userId)
        const user = await User.findById(userId);
        if( !userId ){
            res.status(400).json({ message: "this account doesn't exist."})
        }

        const cryptedPassword = await bcrypt.hash(password, 12);
        await User.updateOne({ 
            password: cryptedPassword
        });

        res.json({ email: user.email, message: "password successfully reset." });

        await db.disconnectDb();
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

export default handler;