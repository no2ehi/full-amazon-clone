import nc from "next-connect";
import db from "../../../utils/db";
import Product from "../../../models/Product"
import User from "../../../models/User"
import Cart from "../../../models/Cart"
import { Result } from "postcss";

const handler = nc();

handler.post( async (req, res) => {     
    try {
        db.connectDb;
        const { cart, user_id } = req.body;
        let products = [];
        let user = await User.findById(user_id);

        let exisiting_cart = await Cart.findOne({ user: user._id });
        if(exisiting_cart) {
            const res = await exisiting_cart.deleteOne().then((resr) => console.log('res: ', resr));
            console.log('result> ', res)
        }
        
        for (let i=0 ; i < cart.length ;i++) {``
            let dbProduct = await Product.findById(cart[i]._id).lean();
            let subProduct = dbProduct.subProducts[cart[i].style];
            let tempProduct = {}
            tempProduct.name = dbProduct.name;
            tempProduct.product = dbProduct._id;
            tempProduct.color = {
                color: cart[i].color.color,
                image: cart[i].color.image,
            };
            tempProduct.image = subProduct.images[0].url;
            tempProduct.qty = Number(cart[i].qty);
            tempProduct.size = cart[i].size;
            let price = Number(subProduct.sizes.find((p) => p.size == cart[i].size).price);
            tempProduct.price = subProduct.discount > 0 ? (price - (price / Number(subProduct.discount))).toFixed(2) : price.toFixed(2);
               
            products.push(tempProduct);
        }
        

        let cartTotal = 0;
        for (let i = 0; i < products.length ; i++ ) {
            cartTotal = cartTotal + (products[i].price * products[i].qty);
        }
        await new Cart({
            products,
            cartTotal: cartTotal.toFixed(2),
            user: user._id,
        }).save();

        db.disconnectDb();
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

export default handler;