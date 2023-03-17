import nc from "next-connect"
import User from "../../../models/User";
import db from "../../../utils/db";
import { passwordResetToken } from "../../../utils/tokens";
import { sendEmail } from "../../../utils/sendEmails";
import { passwordResetTemplate } from "../../../emails/passwordResetTemplate";

const handler = nc();

handler.post( async (req, res) => {
    try{
        await db.connectDb();
        const { email } = req.body;
        if( !email ) {
            return res.status(400).send({ message: "please enter a email."})
        }

        const user = await User.findOne({ email });
        if( !user ) {
            return res.status(401).send({ message: "This email does not exist."})
        }
            
        const userId = passwordResetToken({
            id: user._id.toString()
        });
        const url = `${process.env.BASE_URL}/auth/reset/${userId}`;

        sendEmail(email, url, "", "Reset your Password Account", passwordResetTemplate);

        res.send({ message: "Reset Link has been send to your account. please use it for reset your password."})

        await db.disconnectDb();
    } catch(error) {
        res.status(500).send({ message: error.message })
    }
});

export default handler;