import pool from "../config/db.js";

// Get products
export const getProducts = async (req, res) => {
    try {
        const products = await pool.query(
            "SELECT * FROM products ORDER BY created_at DESC"
        );

        console.log("fetched products", products);
        res.status(200).json({success: true, data: products.rows});

    } catch (error) {
        console.log("Error getProducts function", error);
        res.status(500).json({ success: false, message:"Internal Server Error" })
    }
};

// Get a product
export const getProduct = async (req, res) => {
    const { id } = req.params

    try {
        const product = await pool.query(
            "SELECT * FROM products WHERE id = $1", [id]
        );

        res.status(200).json({ success: true, data: product.rows[0] });

    } catch (error) {
        console.log("Error in getProduct function", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Create a product
export const createProduct = async (req, res) => {
    const {name, price, image} = req.body

    if(!name || !price || !image){
        return res.status(400).json({ success:false, message:"All fields are required" });
    }

    try{
        const newProduct = await pool.query(
            "INSERT INTO products (name, price, image) VALUES ($1, $2, $3) RETURNING *", [name, price, image]
        );

        console.log("new product added: ", newProduct);
        res.status(201).json({ success: true, data: newProduct.rows[0] });

    } catch (error) {
        console.log("Error createProduct function", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });

    }
};

// Update a product
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, image } = req.body;

    try {
        const updatedProduct = await pool.query(
            "UPDATE PRODUCTS SET name = $1, price = $2, image = $3 WHERE id = $4 RETURNING *", [name, price, image, id]
        );

        if(updatedProduct.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({ success: true, data: updatedProduct.rows[0] });

    } catch (error) {
        console.log("Error in updateProduct function", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try{
        const deletedProduct = await pool.query(
            "DELETE FROM products WHERE id = $1 RETURNING *", [id]
        );

        if(deletedProduct.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({ success: true, data: deletedProduct.rows[0] })
    } catch (error) {
        console.log("Error in deleteProduct function", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }

};