import nc from "next-connect";
import db from "../../../utils/db";
import Category from "../../../models/Category";
import slugify from "slugify";

// import use(auth) middleware...
const handler = nc();

handler.post( async( req, res) => {
    try {
        const { name } = req.body;
        db.connectDb();
        const test = await Category.findOne( { name });
        if(test) {
           return res.status(400).json({ message: "Category already exist, Try a different name."})
        }

        await new Category({ name, slug: slugify(name)}).save();

        db.disconnectDb();
        res.json({
            message: `Category ${name} has been created successfully.`,
            categories: await Category.find({}).sort({ updatedAt: -1 })
        })

        
    } catch (error) {
        db.disconnectDb();
        res.status(500).json({ message: error.message })
    }
})


export default handler;