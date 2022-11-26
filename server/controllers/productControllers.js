const productModel = require("../models/productModel");
const {
  JoiProductRegisterValidation,
} = require("../validators/productValidator");

const registerProduct = async (req, res) => {
  const { error } = JoiProductRegisterValidation(req.body);
  if (!error) {
    const productExists = await productModel.findOne({ name: req.body.name });
    if (productExists) res.json({ message: "Product already exist" });
    else {
      const productObject = new productModel(req.body);
      const savedProduct = await productObject.save();
      res.send({ product: savedProduct._id });
    }
  } else res.send({ message: "Product registration error" });
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedProduct = await productModel.deleteOne({ _id: id });
    res.send({ message: `Product with id ${id} deleted` });
  } catch (error) {
    res.send({ message: `Product with id ${id} delete error` });
  }
};

const getProducts = async (req, res) => {
  try {
    const productsList = await productModel.find();
    res.send({ productsList });
  } catch (error) {
    res.send({ message: "Products retrieve error" });
  }
};

const getProductData = async (req, res) => {
  const productID = req.params.id;
  try {
    const product = await productModel.findById(productID);
    res.send({ product });
  } catch (error) {
    res.send({ message: `can not find product id ${productID}` });
  }
};

const updateProduct = async (req, res) => {
  const productID = req.params.id;
  try {
    const updatedProduct = productModel.updateOne({ _id: productID }, req.body);
    res.send({ message: `Product with id ${id} updated` });
  } catch (error) {
    res.send({ message: `Product with id ${id} update error` });
  }
};

module.exports.registerProduct = registerProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.getProducts = getProducts;
module.exports.getProductData = getProductData;
module.exports.updateProduct = updateProduct;
