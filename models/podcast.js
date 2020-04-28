const mongoose = require("mongoose");

const podcast = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    nomPodcast:{type:String,required:true,unique:true},
    typePodcast:{type:String,required:true}, //hedhaaa ynajeeem ykounn emission ou rubrique
    episodes:[{type:mongoose.Schema.Types.ObjectId,ref:'episode'}]

});
module.exports=mongoose.model('podcast',podcast);
