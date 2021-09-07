import { ProductModel } from '../models/index.js';
// import APIFeatures from '../utils/apiFeatures.js';

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
    res.status(500).json({
      message: error,
    });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id)
      .populate('composers', { fullname: 1 })
      .populate('instruments', { name: 1 });

    if (!product) {
      return res.status(404).send(`Product not found`);
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const filter = {};
    const composerIds = JSON.parse(req.query.composers || '[]');
    const instrumentIds = JSON.parse(req.query.instruments || '[]');
    if (composerIds.length) {
      filter.composers = { $in: composerIds };
    }
    if (instrumentIds.length) {
      filter.instruments = { $in: instrumentIds };
    }
    const filterProducts = await ProductModel.find(filter || null, {
      __v: 0,
      media_list: 0,
      price_list: 0,
      description: 0,
      pages: 0,
      release_date: 0,
      genre: 0,
    })
      .sort(req.query.sort)
      .populate('composers', { fullname: 1 })
      .populate('instruments', { name: 1 });
    res.status(200).json(filterProducts);
  } catch (error) {
    console.log(error, 'error');
    res.status(500).json({
      message: error,
    });
  }
};
