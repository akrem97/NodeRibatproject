const podcastModel = require("../models/podcast");
const mongoose = require("mongoose");
const episodeModel = require("../models/episode");



exports.getPodcastsByType=function(req,res){

    podcastModel.find({typePodcast:req.body.typePodcast},(err,podcasts)=>{
        if(err){
            throw err; 
        }
        if(podcasts.length>0){
            return res.send(podcasts);
        }
        else {
            return res.status(404).json({message:'there no podcasts yet '});
        }
    })
}


exports.getAllPodcasts=function(req,res)
{
podcastModel.find()
.exec()
.then(podcasts=>{
    if(podcasts.length>0){
        return res.send(podcasts);}
    else {
        return res.status(404).json({message:'there no podcasts yet '});
    }
})
.catch(err=>{return res.status(500).json(err)})
}




exports.updatepodcast=function(req,res){
    podcastModel.findByIdAndUpdate(req.params.idpodcast,{$set:{nomPodcast:req.body.nomPodcast,typePodcast:req.body.nomPodcast}})
    .exec()
    .then(podcast=>{
        if(podcast){
            return res.status(200).json({message:'update done ',podcast});
        }
        else 
        {
            return res.status(401).json({message:'update failed'});
        }
    })
    .catch(err=>{return res.status(500).json(err)})}


exports.createpodcast=function(req,res){
podcastModel.findOne({nomPodcast:req.body.nomPodcast})
.exec()
.then(podcast=>{
    if(podcast){
        return res.status(401).json({message:'podcast exist try again'});
    }
    else {
         let podcast = new podcastModel({
             _id:new mongoose.Types.ObjectId(),
             nomPodcast:req.body.nomPodcast,
             typePodcast:req.body.typePodcast
            })
         podcast.save()
         .then(podcast=>{
             if(podcast)
             {
                 return res.status(201).json({message:'podcast is created successfully ! ',podcast});
             }
             else {
                 return res.status(401).json({message:'creation failed !!!'});
             }
         })
         .catch(err=>{
            return res.status(500).json(err);
         })
    }
})
.catch(err=>{return res.status(500).json(err)});
}




exports.deletePodcast=function(req,res){
    podcastModel.findOneAndDelete(req.params.idpodcast)
    .exec()
    .then(async podcast=>{
        if(podcast)
        {
            if(podcast.episodes.length>0)
            {
                const episode = await episodeModel.deleteMany({podcast:podcast._id})
                if(episode)
                {
                    return res.status(200).json({message:'podcast delete successfully'});
                }
                else {
                    return res.status(401).json({message:'podcast delete failed'});
                }
         
            }
            return res.status(200).json({message:'podcast delete done'});
       
        }
        else {
            return res.status(401).json({message:'delete failed'});
        }
    })
    .catch(err=>{return res.status(500).json(err)})




}
exports.getPodcast=function(req,res){
    podcastModel.findById(req.params.idpodcast)
    .populate('episode')
    .exec()
    .then(podcast=>{
        if(podcast){
            return res.status(200).json({podcast});
        }
        else {
            return res.status(404).json({message:'podcast not found'});
        }
    })
    .catch(err=>{
        return res.status(500).json(err);
    })
}

