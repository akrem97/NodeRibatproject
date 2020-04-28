const episodeModel = require("../models/episode");
const mongoose = require("mongoose");
const podcastModel = require("../models/podcast");


exports.updateEpisode=function(req,res){
    episodeModel.findById(req.params.idepisode)
    .exec()
    .then(episode=>{
        if(episode){
            episode.nom=req.body.nom;
            episode.invites=req.body.invites;
            episode.sequence=req.file.path;
            episode.save()
            .then(episode=>{
                if(episode)
                {
                    return res.status(200).json({message:'episode updated',episode});
                }
                else 
                {
                    return res.status(401).json({message:'update failed'});
                }
            }).catch(err=>{return res.status(500).json(err)})
        }
        else {
                return res.status(404).json({message:'episode not found'});
             }
        })
    .catch(err=>{return res.status(500).json(err)})
}


exports.delete_episode=function(req,res)
{
    episodeModel.findByIdAndDelete(req.params.idepisode)
    .exec()
    .then(episode=>{
        if(episode)
        {
            podcastModel.findByIdAndUpdate(episode.podcast,{$pull:{episodes:episode._id}})
            .exec()
            .then(podcast=>{
                if(podcast){
                    return res.status(200).json({message:'episode deleted',podcast});
                }
                else {
                    return res.status(401).json({message:'episode delete failed'});
                }
            })
            .catch(err=>{res.status(500).json(err)})
        }
        else 
        {
            return res.status(401).json({message:'episode delete failed'});
        }
    })
    .catch(err=>{return res.status(500).json(err);})

}





exports.createEpisode=function(req,res)
{ 
    
const episode = new episodeModel({
    _id:new mongoose.Types.ObjectId(),
    nom:req.body.nom,
    invites:req.body.invites,
    sequence:req.file.path,
    date_creation:new Date().getTime(),
    podcast:req.params.idpodcast
});
episode.save()
.then(episode=>{
    if(episode){
        podcastModel.findByIdAndUpdate(req.params.idpodcast,{$push:{episodes:episode}})
        .exec()
        .then(podcast=>{
            if(podcast)
            {
                return res.status(201).json({message:'episode created done',episode});
            }
            else
            {
                return res.status(401).json({message:'episode creation failed'});
            }
        })  
        .catch(err=>{
                return res.status(500).json({err});
        })}
})
}


exports.getEpisode=function(req,res)
{
    episodeModel.findById(req.params.idepisode)
    .exec()
    .then(episode=>{
        if(episode)
        {
            return res.status(200).json(episode);
        }
        else {
            return res.status(404).json({message:'episode not found'});
        }
    })
    .catch(err=>{
        return res.status(500).json(err);
    })
}
exports.getEpisodesbyPodcast=function(req,res){
    episodeModel.find({podcast:req.params.idpodcast})
    .exec()
    .then(episodes=>{
        if(episodes.length>0){
            return res.status(200).json(episodes);
        }
        else {
            return res.status(404).json({message:'episodes not found'});
        }
    })
    .catch(err=>{
        return res.status(500).json(err);
    })
}
