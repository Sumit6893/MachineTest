import db from "../db.js"
import { fatchCategories, insertCategory, removeCategory, updateCategories } from "../model/categoryModel.js";
//create
export const createCategory = (req, res) => {
  const { category_name } = req.body;
  insertCategory(category_name,(err, result)=>{
    if(err){
        return res.status(500).json(err);
    }
    res.json({message: "category created"});
  })
};


//Read
export const getCategories = (req, res) => {
  fatchCategories((err, result)=>{
    if(err) return res.status(500).json(err);
    // console.log(result[0]);
    res.json(result);
  });
};


//update

export const moidfyCategories = (req, res)=>{
    const {id} = req.params;
    const {category_name} = req.body;

    updateCategories(id, category_name, (err)=>{
        if(err) return res.status(500).json(err);
        res.json({message:"Category update"});
    });
};

//Deleted

export const deleteCategories = (req, res)=>{
    const {id} = req.params;

    removeCategory(id, (err)=>{
        if(err) return res.status(500).json(err);
        res.json({message:"category deleted"})
    })
};