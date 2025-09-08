import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";

// Function to create JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Route: User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id);
            return res.json({ success: true, token });
        } else {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

// Route: User Registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }

        // Check if all required fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Missing required details' })
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" })
        }

        // Validate password strength
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" })
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save new user
        const newUser = new userModel({
            name, email, password: hashedPassword
        })

        const user = await newUser.save();

        // Generate token and send response
        const token = createToken(user._id);
        res.json({ success: true, token })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

// Route: Admin Login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Get admin credentials from env
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        // Check email
        if (email !== adminEmail) {
            return res.status(401).json({ success: false, message: "Invalid email" });
        }

        // Check password
        if (password !== adminPassword) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        if (email === adminEmail && password === adminPassword) {
            const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET);
            res.status(200).json({ success: true, message: "Admin login successful", token });
        } else {
            res.status(401).json({ success: false, message: "Invalid email or password" });
        }




        // If both match
        res.status(200).json({ success: true, message: "Admin login successful" });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { loginUser, registerUser, loginAdmin }
