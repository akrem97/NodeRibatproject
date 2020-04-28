const mongoose = require("mongoose");
const episodeSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    nom:String,
    invites:String,
    sequence:String,
    date_creation:Date,
    podcast:{type:mongoose.Schema.Types.ObjectId,ref:'podcast'}
});
module.exports=mongoose.model('episode',episodeSchema);
