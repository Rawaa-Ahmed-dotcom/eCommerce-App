import Cart from "../../models/Cart.mjs";

export const mergeCart = async (req, res) => {
    try {
        const { mergedItems } = req.body;
        const { _id } = req.user;
        let userCart = await Cart.findOne({userId : _id});
        
        if(!userCart) {
           userCart = new Cart({userId : _id ,items : [] , billTotal : 0}); 
        }
        if(mergedItems && mergedItems.length > 0) {
            userCart.items.push(...mergedItems);
        }
        await userCart.save();
        return res.status(200).json(userCart);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}