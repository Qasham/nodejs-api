import ProductModel from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const newProduct = await ProductModel.create(req.body);
    res.status(201).json({ newProduct, message: "Product created" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
