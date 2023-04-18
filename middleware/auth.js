import { getToken } from "next-auth/jwt";

const auth = async (req, res, next) => {
    const token = await getToken({
        req,
        secret: process.env.JWT_SECRET,
        secureCookie: process.env.NODE_ENV === "production",
    });

    if(token) {
        // sing in
        req.user = token.sub;
        next();
    } else {
        res.satus(401).json({ message: "Not signed in: "});
    }

    res.end;
};

export default auth;
