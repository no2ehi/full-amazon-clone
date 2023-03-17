import nc from "next-connect";
import db from "../../../utils/db";
import { validateEmail } from "../../../utils/validation";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import { createActivationToken } from "../../../utils/tokens";
import { sendEmail } from "../../../utils/sendEmails";
import { activateEmailTemplate } from "../../../emails/activateEmailTemplate";

const handler = nc();

handler.post(async (req, res) => {
    try {
        await db.connectDb();
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ message: "Please fill in all fields." });
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ message: "invalid email." });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res
                .status(400)
                .json({ message: "this email already exits." });
        }
        if (password.length < 6) {
            return res
                .status(400)
                .json({ message: "password must be at least 6 characters." });
        }
        const cryptedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            name,
            email,
            password: cryptedPassword,
        });
        const addedUser = await newUser.save();

        const activation_token = createActivationToken({
            id: addedUser._id.toString(),
        });

        const url = `${process.env.BASE_URL}/activate/${activation_token}`;

        sendEmail(email, url,"", "Activate your account", activateEmailTemplate);

        await db.disconnectDb();
        res.json({ message: "Register success! please activate your email to start."})

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default handler;
