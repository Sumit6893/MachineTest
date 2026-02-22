import db from "../db.js";

//insert
export const insertCategory = (category_name, callback)=>{
    const sql = "insert into category (category_name) values(?)";
    db.query(sql, [category_name], callback);
};

//get
export const fatchCategories = (callback)=>{
    db.query("select * from category", callback);
};

//update
export const updateCategories = (id, category_name, callback)=>{
    const sql = "update category SET category_name=? where category_id=?";
    db.query(sql, [category_name, id], callback)
};

//DELETE
export const removeCategory = (id, callback)=>{
    db.query("DELETE from category where category_id=?", [id], callback);
};