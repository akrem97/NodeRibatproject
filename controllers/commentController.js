const mongoose = require("mongoose");
const commentModel = require("../models/comment");
const actualiteModel = require("../models/actualite");
exports.createComment=function(req,res){

    const comment = new commentModel({
        _id:mongoose.Types.ObjectId(),
        contenu:req.body.contenu,
        date_creation:new Date().getTime(),
        actualite:req.params.idactualite
    });
    comment.save()
    .then(comment=>{
        if(comment)
        {
            actualiteModel.findByIdAndUpdate(req.params.idactualite,{$push:{comments:comment}})
            .exec()
            .then(actualite=>{
                if(actualite)
                {
                    return res.status(201).json(comment);
                }
                else {
                    return res.status(401).json({message:'creation failed'});
                }
            })
            .catch(err=>{return res.status(500).json(err)})
        }
        else {
            return res.status(401).json({message:'creation failed'});
        }
    })
    .catch(err=>{return res.status(500).json(err)})



}

exports.showCommentsByActualite=function(req,res){
    commentModel.find({actualite:req.params.idactualite})
    .exec()
    .then(comments=>{
        if(comments.length>0)
        {
            return res.send(comments);
        }
        else {
            return res.status(404).json({message:'comments not found'});
        }
    })
    .catch(err=>{
        return res.status(500).json(err)
    })
}

exports.showComments=function(req,res){
    commentModel.find()
    .exec()
    .then(comments=>{
        if(comments.length>0)
        {
            return res.send(comments);
        }
        else {
            return res.status(404).json({message:'comments not found'});
        }
    })
    .catch(err=>{
        return res.status(500).json(err)
    })
}




