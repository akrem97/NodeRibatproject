const mongoose = require("mongoose");

const categoryModel = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    nomCategory:{type:String,required:true},
    actualites:[{type:mongoose.Schema.Types.ObjectId,ref:'actualite'}]

}
);

module.exports=mongoose.model('category',categoryModel);

