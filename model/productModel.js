import db from "../db.js";

// CREATE
export const insertProduct = (product_name, category_id, callback) => {
  const sql =
    "INSERT INTO Product (product_name, category_id) VALUES (?, ?)";
  db.query(sql, [product_name, category_id], callback);
};

// fetch + pagination + join
export const fetchProducts = (pageSize, offset, callback) => {
  const sql = `
    SELECT p.product_id, p.product_name,
           c.category_id, c.category_name
    FROM Product p
    JOIN Category c ON p.category_id = c.category_id
    LIMIT ? OFFSET ?
  `;

  db.query(sql, [pageSize, offset], callback);
};

// UPDATE
export const modifyProduct = (id, product_name, category_id, callback) => {
  const sql =
    "UPDATE Product SET product_name=?, category_id=? WHERE product_id=?";
  db.query(sql, [product_name, category_id, id], callback);
};

// DELETE
export const removeProduct = (id, callback) => {
  db.query("DELETE FROM Product WHERE product_id=?", [id], callback);
};