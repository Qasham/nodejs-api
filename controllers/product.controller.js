import { ProductModel } from '../models/index.js';

export const createProduct = async (req, res, next) => {
  try {
    const newProduct = new ProductModel(req.body);

    // check model is valid
    const isInValidModel = newProduct.validateSync();
    if (isInValidModel) {
      return res.status(400).json({ message: `${isInValidModel}` });
    }

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    // next(error);
    res.status(500).json({ message: `${error}` });
  }
};

export const getProducts = async (req, res) => {
  try {
    const allProducts = await ProductModel.find(null, {
      __v: 0,
      media_list: 0,
    })
      .populate('composers', { fullname: 1, photo_url: 1 })
      .populate('instruments', { name: 1 });

    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};
