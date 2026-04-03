// import userModel from "../models/userModels.js";
// import orderModel from "../models/orderModel.js";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // Placing user order from frontend
// const placeOrder = async (req, res) => {
//     const frontend_url = "http://localhost:5173"; // Your frontend URL

//     try {
//         const newOrder = new orderModel({
//             userId: req.user.id,
//             items: req.body.items,
//             amount: req.body.amount,
//             address: req.body.address
//         });
//         await newOrder.save();
//         // After saving the order, clear the user's cart
//         await userModel.findByIdAndUpdate(req.user.id, { cartData: {} });

//         // --- Create Stripe Payment Link ---
//         const line_items = req.body.items.map((item) => ({
//             price_data: {
//                 currency: "lkr", // Change to your currency
//                 product_data: {
//                     name: item.name,
//                 },
//                 unit_amount: item.price * 100, // Amount in cents
//             },
//             quantity: item.quantity,
//         }));

//         // Add delivery fee as a line item
//         line_items.push({
//             price_data: {
//                 currency: "lkr",
//                 product_data: {
//                     name: "Delivery Fee",
//                 },
//                 unit_amount: req.body.deliveryFee * 100,
//             },
//             quantity: 1,
//         });

//         const session = await stripe.checkout.sessions.create({
//             line_items: line_items,
//             mode: 'payment',
//             success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
//         });

//         res.json({ success: true, session_url: session.url });

//     } catch (error) {
//         console.error("Error placing order:", error);
//         res.status(500).json({ success: false, message: "Server error placing order." });
//     }
// };

// // Verifying order payment status
// const verifyOrder = async (req, res) => {
//     const { orderId, success } = req.body;
//     try {
//         if (success === "true") {
//             await orderModel.findByIdAndUpdate(orderId, { payment: true });
//             res.json({ success: true, message: "Payment successful" });
//         } else {
//             // If payment failed, delete the order to prevent unpaid orders in DB
//             await orderModel.findByIdAndDelete(orderId);
//             res.json({ success: false, message: "Payment failed" });
//         }
//     } catch (error) {
//         console.error("Error verifying order:", error);
//         res.status(500).json({ success: false, message: "Server error verifying payment." });
//     }
// };

// // Fetching user's orders
// const userOrders = async (req, res) => {
//     try {
//         const orders = await orderModel.find({ userId: req.user.id });
//         res.json({ success: true, data: orders });
//     } catch (error) {
//         console.error("Error fetching user orders:", error);
//         res.status(500).json({ success: false, message: "Server error fetching orders." });
//     }
// };

// export { placeOrder, verifyOrder, userOrders };

import userModel from "../models/userModels.js";
import orderModel from "../models/orderModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// --- User-Facing Functions ---

// Placing user order from frontend
const placeOrder = async (req, res) => {
    const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173";

    try {
        const newOrder = new orderModel({
            userId: req.user.id,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();
        // After saving the order, clear the user's cart
        await userModel.findByIdAndUpdate(req.user.id, { cartData: {} });

        // Create Stripe Payment Link
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "lkr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, // Amount in cents
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency: "lkr",
                product_data: {
                    name: "Delivery Fee",
                },
                unit_amount: req.body.deliveryFee * 100,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "Server error placing order." });
    }
};

// Verifying order payment status
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Payment successful" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment failed" });
        }
    } catch (error) {
        console.error("Error verifying order:", error);
        res.status(500).json({ success: false, message: "Server error verifying payment." });
    }
};

// Fetching a specific user's orders
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.user.id });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ success: false, message: "Server error fetching orders." });
    }
};


// --- Admin-Facing Functions ---

// API Endpoint to list all orders for the admin panel
 const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("List Orders Error:", error);
        res.status(500).json({ success: false, message: "Error fetching orders" });
    }
};

// API Endpoint to update order status
 const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.error("Update Status Error:", error);
        res.status(500).json({ success: false, message: "Error Updating Status" });
    }
};


// --- Export all functions ---
export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };

