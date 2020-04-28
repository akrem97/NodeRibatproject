const mongoose = require("mongoose");



const videoSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    sequence:String,
    description:String,
    Date_cration:Date
});

module.exports = mongoose.model("video",videoSchema);