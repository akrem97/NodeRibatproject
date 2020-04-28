const mongoose = require("mongoose");

const sub_adminModel = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    nom:{type:String,required:true},
    prenom:{type:String,required:true},
    motdepasse:{type:String,required:true},
    email:{type:String,required:true}

});


module.exports=mongoose.model('sub_admin',sub_adminModel);
