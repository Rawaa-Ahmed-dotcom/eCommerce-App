import Order from "../../models/Order.mjs";
import { shipping } from "../../utils/shipping.mjs";
import Product from "../../models/Product.mjs";
import { simulatePayment } from "../../utils/simulatePayment.mjs";
export const createOrder = async (req, res) => {
    try {
        const { orderItems, personalInfo } = req.body;
        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ msg: "Cart Items Not Found" });
        }
        if(!personalInfo?.paymentMethod || !["ccd", "card"].includes(personalInfo.paymentMethod)) {
            return res.status(400).json({msg : "Please select a valid payment method"});
        }
        const validatedOrderItems = [];
        for (const item of orderItems) {
            const product = await Product.findOne({ slug: item.product });
            if (!product) res.status(404).json({ msg: "Product not found" });
            validatedOrderItems.push(
                {
                    product: product._id,
                    size: item.size,
                    color: item.color,
                    quantity: item.quantity,
                    price: product.salePrice || product.price,
                    image : product.images.find((image) => image.isPrimary).url,
                    title : product.title
                }
            )
        }
        const shippingCity = personalInfo?.shippingAddress?.city;
        const itemsPrice = validatedOrderItems.reduce((acc, item) => item.price * item.quantity + acc, 0);
        const taxPrice = itemsPrice * 0.14;
        const shippingPrice = shipping[shippingCity.toLowerCase()];
        let transactionId = null;
        let isPaid = false;
        if (personalInfo.paymentMethod === "card") {
            try {
                transactionId = await simulatePayment({ ccv: personalInfo.cardInfo?.ccv, cardNumber: personalInfo?.cardInfo?.cardNumber });
                
                isPaid = true;
            }
            catch (err) {
                return res.status(402).json({
                    success: false,
                    message: `Payment Failed: ${err.message}`
                });
            }
        }
        if(personalInfo.paymentMethod === "ccd") {
            transactionId = "COD";
        }
        const order = new Order({
            userId: req.user._id,
            orderItems: validatedOrderItems,
            contactInfo: personalInfo.contactInfo,
            shippingAddress: personalInfo.shippingAddress,
            paymentMethod: personalInfo.paymentMethod,
            shippingPrice,
            taxPrice: taxPrice.toFixed(2),
            totalPrice: itemsPrice.toFixed(2),
            isPaid,
            paymentDetails : {
                paidAt : personalInfo.paymentMethod === "card" ? Date.now() : null,
                transactionId
            }

        });
        const savedOrder = await order.save();
        return res.status(201).json({ msg: "Order Created Successfully", data: savedOrder });

    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}