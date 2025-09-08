import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

// Function: Add Product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // Extract uploaded images
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        // Upload to Cloudinary
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === 'true' ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now(),
        };

        const product = new productModel(productData);
        await product.save();

        res.status(201).json({ success: true, message: "Product added successfully", product });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Function: List all products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Failed to fetch products" });
    }
};

// Function: Remove a product
const removeProduct = async (req, res) => {
    try {
        const { id } = req.body;
        const product = await productModel.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Failed to remove product" });
    }
};

// Function: Get single product info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Failed to fetch product details" });
    }
};

export { addProduct, listProducts, removeProduct, singleProduct };
