const Order = require("../models/orderModel");
// 1. Import your Product Model (Ensure the filename path is correct for your project)
const Product = require("../models/Product");

// 1. Remove "exports." from here
const submitOrder = async (req, res) => {
    try {
        const { cart, paymentstatus } = req.body;

        // ✨ Safety Fix: Validate if req.user exists before pulling the ID
        if (!req.user || !req.user._id) {
            return res.status(401).json({ 
                status: false, 
                message: "Authorization failed. User profile context missing from request header tokens." 
            });
        }

        const userId = req.user._id;
        // const userId = req.user._id; 

        if (!cart || cart.length === 0) {
            return res.status(400).json({ status: false, message: "Cart is empty" });
        }

        let totalAmount = 0;
        const orderedItems = cart.map(item => {
            const finalPrice = item.offerprice || item.price;
            const quantity = item.qty || item.quantity || 1;
            
            totalAmount += finalPrice * quantity;

            return {
                product: item._id || item.productid,
                quantity: quantity,
                price: finalPrice
            };
        });

        const newOrder = new Order({
            user: userId,
            items: orderedItems,
            totalAmount: totalAmount,
            paymentStatus: "Completed", 
            razorpayPaymentId: paymentstatus
        });

        await newOrder.save();

        // 2. ✨ INVENTORY MANAGEMENT LOGIC
        // Loop over each item processed from the cart and decrease database stock balance
        for (const item of orderedItems) {
            await Product.findByIdAndUpdate(
                item.product, 
                { 
                    // Using a negative value with $inc subtracts the exact quantity from the 'stock' field
                    $inc: { stock: -item.quantity } 
                },
                { new: true } // Returns the newly modified product data if needed
            );
        }
        
        return res.status(201).json({
            status: true,
            message: "Order submitted successfully",
            order: newOrder
        });

    } catch (error) {
        console.error("Order Submission Backend Error:", error);
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate("user", "name email phone") // Pull customer metadata
            .populate("items.product", "title category images price") // Pull original product definitions
            .sort({ createdAt: -1 }); // Newest transactions first

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getRevenueStats = async (req, res) => {
    try {
        const stats = await Order.aggregate([
            {
                // Only count successful transactions
                $match: { paymentStatus: "Completed" }
            },
            {
                // Group everything together and sum the totalAmount
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalAmount" }
                }
            }
        ]);

        // If there are no orders yet, return 0 instead of empty array
        const totalRevenue = stats.length > 0 ? stats[0].totalRevenue : 0;

        res.status(200).json({
            success: true,
            totalRevenue
        });
    } catch (error) {
        console.error("Revenue API Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// 2. Add this line at the bottom of the file!
module.exports = {
    submitOrder,
    getAllOrders,
    getRevenueStats,
};