const videoModel = require("../models/video");
const mongoose = require("mongoose");


exports.create=function(req,res){
    let video = new videoModel({
        _id:new mongoose.Types.ObjectId(),
        sequence:req.file.path,
        description:String,
        Date_creation:new Date().getTime()
    });
    video.save()
    .then(video=>{
        if(video){
            return res.status(201).json({message:'video created',video});
        }
        else {
            return res.status(401).json({message:'video creation failed '});
        }
    })
    .catch(err=>{return res.status(500).json(err)})
}

exports.update=function(req,res){
videoModel.findById(req.params.idvideo).exec()
.then(video=>{
    if(video){
        video.sequence=req.file.path;
        video.descriptio=req.body.description;
        video.save()
        .then(result=>{
            if(result){
                return res.status(200).json({message:'video updated',video})
            }
            else {
                return res.status(401).json({message:'video update failed'})
            }
        })
        .catch(err=>{
            return res.status(500).json(err);
        })
    }
    else {
        return res.status(404).json({message:'video not found'});
    }
})
.catch(err=>{
    return res.status(500).json(err);
})
}
exports.getAll=function(req,res){
    videoModel.find()
    .then(videos=>{
        if(videos.length>0){
                return res.send(videos);
        }
        else {
            return res.status(404).json({message:'videos not found yet'});
        }
    })
    .catch(err=>{
        return res.status(500).json(err);

    })
}
exports.deleteVideo=function(req,res){
videoModel.findByIdAndDelete(req.params.idvideo)
.exec()
.then(video=>{
    if(video)
    {
        return res.status(200).json({message:'video deleted done '})
    }
    else {
        return res.status(401).json({message:'video delete failed'});
    }
})
.catch(err=>{
    return res.status(500).json(err);
})
}

exports.getVideo=function(req,res)
{
videoModel.findById(req.params.idvideo)
.exec()
.then(video=>{
    if(video){
        return res.send(video);
    }
    else {
        return res.status(404).json({message:'video not found'});
    }
})
.catch(err=>{
    return res.status(500).json(err);

})

}
