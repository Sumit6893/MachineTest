import { fetchProducts, insertProduct, modifyProduct, removeProduct } from "../model/productModel.js";


// CREATE
export const createProduct = (req, res) => {
  const { product_name, category_id } = req.body;

  insertProduct(product_name, category_id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product created" });
  });
};

// READ WITH PAGINATION
export const getProducts = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const offset = (page - 1) * pageSize;

  fetchProducts(pageSize, offset, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// UPDATE
export const updateProduct = (req, res) => {
  const { id } = req.params;
  const { product_name, category_id } = req.body;

  modifyProduct(id, product_name, category_id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product updated" });
  });
};

// DELETE
export const deleteProduct = (req, res) => {
  const { id } = req.params;

  removeProduct(id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product deleted" });
  });
};