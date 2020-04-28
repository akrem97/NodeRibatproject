const  actualiteModel = require("../models/actualite");
const mongoose = require("mongoose");
const adminModel = require("../models/admin");
const categoryModel = require("../models/category");
const commentModel = require("../models/comment");
const fs = require("fs");


exports.getActualitesByCategory=function(req,res){
    categoryModel.findById(req.params.idcategory)
    .exec()
    .then(async category=>{
        if(category)
        {   
            var actualites = [];
            for(let i=0 ;i<category.actualites.length;i++)
                {
                let actualite = await actualiteModel.findById(category.actualites[i]); 
                actualites.push(actualite);
            }
            return res.send(actualites);
            
       
       
       
        }
        else {
            return res.send({message:'category not found'});
        }
    })
    .catch(err=>{res.status(500).json(err)});

}

exports.getAllActualites=function(req,res){
actualiteModel.find()
.populate('category','nom')
.exec()
.then(actualites=>{
    if(actualites.length>0)
    {
        return res.send(actualites);
    }
    else {
        return res.send({message:'actualites not found'});
        }
})
.catch(err=>{return res.status(500).json(err)})
}

exports.CreateActualite=function(req,res){
    adminModel.findById(req.params.idadmin)
    .exec()
    .then(admin=>{
            if(admin){
                let actualite = new actualiteModel({
                    _id: new mongoose.Types.ObjectId(),
                    titre:req.body.titre,
                    image:req.file.path,
                    contenu:req.body.contenu,
                    dateCreation:new Date().getTime(),
                    admin:req.params.idadmin,
                    category:req.params.idcategory,
                    creePar:admin.nom +" "+admin.prenom
                });
                actualite.save()
                .then(async actualite=>{
                    if(actualite)
                    {
                        const admin = await adminModel.findByIdAndUpdate(req.params.idadmin,{$push:{actualites:actualite}});
                        const category=await categoryModel.findByIdAndUpdate(req.params.idcategory,{$push:{actualites:actualite}});
                        
                        if(admin && category){
                                return res.status(201).json({message:'acuatlite created',actualite});
                        }
                        else {
                            return res.status(401).json({message:'actualite failed'});
                        }
                    }
                    else {
                        return res.status(401).json({message:'actualite failed'});
                        
                    }
                })
                .catch(err=>{
                    return res.status(500).json(err);
                })
            }
            else {
                return res.status(404).json({message:'admin not found'});
            }



    })
    .catch(err=>{
        return res.status(500).json(err)
    })
}


exports.getActualite=function(req,res)
{
    actualiteModel.findById(req.params.idactualite)
    .exec()
    .then(actualite=>{
        if(actualite)
        {
            actualite.nbvisiteurs+=1;
            actualite.save()
            .then(actualite=>{
                if(actualite){return res.status(200).json(actualite)}
                else {
                    return res.status(401).json({message:'nb visiteurs failed to update'});
                }
            })
            .catch(err=>{return res.status(500).json(err)})
        }
        
        else {
            return res.status(404).json({message:'actualite not found'});
        }
    })
    .catch(err=>{return res.status(500).json(err)});
}
exports.updateActualite=function(req,res){
    actualiteModel.findById(req.params.idactualite)
.exec()
.then(async actualite=>{
    if(actualite)
    {   let admin=null;
        admin= await adminModel.findById(req.params.adminid)
        if(admin)
        {
            actualite.titre=req.body.titre;
            actualite.contenu=req.body.contenu;
            actualite.modifiePar=admin.nom+admin.prenom;
            actualite.image=req.file.path;
            actualite.save()
            .then(actualite=> {
                if(actualite){
                    return res.status(200).json({message:'actualite updated ',actualite});

                }
                else {
                    return res.status(401).json({message:'actualite update failed'});
                }
            })
            .catch(err=>{return res.status(500).json(err)});
        }
        else {
            return res.status(404).json({message:'admin not found'});
        }
    }
    else {
        return res.status(404).json({message:'actualite not found'});
    }
})
.catch(err=>{return res.status(500).json(err)});


}

exports.deleteActualite=function(req,res){

actualiteModel.findByIdAndDelete(req.params.idactualite)
.exec()
.then(async actualite=>{
    if(actualite){

               if(actualite.comments.length>0){
                const result = await commentModel.deleteMany({actualite:actualite});}
                const idcategory=mongoose.Types.ObjectId(actualite.category);
                const idadmin = mongoose.Types.ObjectId(actualite.admin);

                const category = await categoryModel.findByIdAndUpdate(idcategory,{$pull:{actualites:actualite._id}})
                const admin = await adminModel.findByIdAndUpdate(actualite.admin,{$pull:{actualites:actualite._id}})
                
          if(admin && category)
          {
            fs.unlink(actualite.image,(err)=>{
                if(err)
                {
                    throw err;
                }
            })

            return res.status(200).json({message:'delete Done',actualite});
            
        
        
        }
          else {return res.status(401).json({message:'delete actualite failed'});}}
            else {
        return res.status(401).json({message:'delete failed'});
    }})
.catch(err=>{
    return res.status(500).json(err);
})




}