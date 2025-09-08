// Add products to user cart
import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;
        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData;

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Item added to cart successfully" });
    } catch (error) {
        console.error("Error in addToCart:", error);
        res.status(500).json({ success: false, message: "Server error while adding to cart" });
    }
};

// Update user cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData;

        cartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Cart updated successfully" });
    } catch (error) {
        console.error("Error in updateCart:", error);
        res.status(500).json({ success: false, message: "Server error while updating cart" });
    }
};


// Get user cart data
const updateUserCart = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData

        res.json({ success: true, cartData });
    } catch (error) {
        console.error("Error in updateUserCart:", error);
        res.status(500).json({ success: false, message: "Server error while fetching cart" });
    }
};


export { addToCart, updateCart, updateUserCart }