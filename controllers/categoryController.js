const categoryModel = require("../models/category");
const mongoose = require("mongoose");
const actualiteModel = require("../models/actualite");
const adminModel = require("../models/admin");
const commentModel = require("../models/comment");


exports.updateCategory=function(req,res){
    categoryModel.findByIdAndUpdate(req.params.idcategory,{$set:{nomCategory:req.body.nomCategory}})
    .exec()
    .then(category=>{
        if(category){
            return res.status(200).json({message:'category updated',category});
        }
        else {
        return res.status(401).json({message:'update failed'});
            }
        })
    .catch(err=>{
        return res.status(500).json(err);
    })
}


exports.getAllCategories=function(req,res){
    categoryModel.find()
    .exec()
    .then(categories=>{
        if(categories.length>0){
            return res.send(categories);
        }
        else {
            return res.status(404).json({message:'categories not found'});
        }
    })
    .catch(err=>{
        return res.status(500).json(err);
    })
}


exports.createCategory=function(req,res){
    const category = new categoryModel({
        _id:new mongoose.Types.ObjectId(),
        nomCategory:req.body.nomCategory
        });

        category.save()
        .then(category=>{
            if(category){
                return res.status(201).json({message:'category created successfully',category});
            }
            else {
                return res.status(401).json({message:'category failed'});
            }
        })
        .catch(err=>{
            return res.status(401).json(err);
        })
}
exports.showCategory=function(req,res){
    categoryModel.findById(req.params.idcategory)
    .populate({path:'actualites'})
    .exec()
    .then(category=>{
        if(category)
        {
            return res.send(category);
        }
        else 
        {
            return res.status(404).json({message:'category not found'});
        }
    })
    .catch(err=>{return res.status(500).json(err)});
}


exports.deleteCategory= function(req,res)
{categoryModel.findByIdAndRemove(req.params.idcategory)
.exec()
.then(async category=>{
    
if(category)           
    {
if(category.actualites.length>0)
        {
            for(let i =0;i<category.actualites.length;i++)
            {
                const actualite = await actualiteModel.findById(category.actualites[i])
                const admin = await adminModel.findByIdAndUpdate(actualite.admin,{$pull:{actualites:actualite._id}})
                console.log(admin);

                if(actualite.comments.length>0)
                {await commentModel.findOne({actualite:actualite});}
            }
        const result= await actualiteModel.deleteMany({category:category._id});
            if(result){
                return res.status(200).json({message:'category delete done'}); 
            }
            else {
                return res.status(401).json({message:'category delete failed'}); 

            }
        }    
        return res.status(200).json({message:'category delete done'}); 
    }
else {
    return res.status(401).json({message:'category delete failed'}); 
}
})
.catch(err=>{return res.status(500).json(err)})
}


