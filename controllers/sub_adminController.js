const mongoose = require("mongoose");
const sub_adminModel = require("../models/sub_admin");
const generator = require("generate-password");
const nodeMailer = require("node-mailer");
const jwt = require("jsonwebtoken");


exports.updateInfo=function(req,res)
{

    sub_adminModel.findById(req.params.id_subadmin)
.exec()
.then(sub_admin=>{
    if(sub_admin)
    {
        bcrypt.hash(req.body.motdepasse,10,(err,encrypted)=>{
            if(err)
            {
                throw new Error();
            }

            if(encrypted)
            {
                sub_admin.motdepasse=encrypted;
                sub_admin.nom=req.body.nom;
                sub_admin.prenom=req.body.prenom;
                sub_admin.email=req.body.email;
                sub_admin.save()
                .then(sub_admin=>{
                    if(sub_admin) {
                        return res.status(200).json({message:'sub_admin updated successfully',sub_admin});
                    }
                    else {
                        return res.status(401).json({message:'update failed'});
                    }
                })
                .catch(err=>{
                    return res.status(500).json(err)
                })
            }
        })
        }
        else {
            return res.status(404).json({message:'sub_admin not found'});
        }
})
.catch(err=>{
    return res.status(500).json(err)
})
}






exports.getAll_sub_admins=function(req,res){
sub_adminModel.find()
.exec()
.then(sub_admins=>{
    if(sub_admins.length>0)
    {
        return res.send(sub_admins);
    }
    else {
        return res.send({message:'sub_admins still not found'});
    }
})
.catch(err=>{return res.status(500).json(err)});
}

exports.getSub_Admin=function(req,res)
{

    sub_adminModel.findById(req.params.id_subadmin)
    .exec()
    .then(sub_admin=>{
            if(sub_admin)
            {
                return res.status(200).json({sub_admin});
            }
            else {
                return res.status(404).json({message:"sub admin not found"});
            }
    })
    .catch(err=>{
        return res.status(500).json(err);
    });
}


exports.deleteAdmin = function(req,res){
    sub_adminModel.findOneAndRemove({_id:req.params.id_subadmin})
    .exec()
    .then(sub_deleted=>{
        if(sub_deleted){return res.status(200).json({message:'sub_admin deleted successfully'})}
        else {
            return res.status(401).json({message:'delete failed'});
        }
    })
    .catch(err=>{return res.status(500).json(err)});
}

exports.login_subAdmin=function(req,res){   
sub_adminModel.findOne({email:req.body.email})
.exec()
.then(sub_admin=>{
    if(sub_admin)
    {
        if(req.body.motdepasse===localStorage.getItem('motdepasse'))
        {
            const token=jwt.sign({nom:sub_admin.nom,sub_admin_id:sub_admin._id},"Secret",{expiresIn:60*60*60})
            return res.status(200).json({message :' login successfully',token})
        }
        else {
            return res.status(401).json({message:'password incorrect'});
        }
    }
    else {
        return res.status(401).json({message:'email incorrect'});

    }
})
.catch(err=>{return res.status(500).json(err)})
}
exports.create_SubAdmin=function(req,res){

sub_adminModel.findOne({email:req.body.email})
.exec()
.then(sub_admin=>{
    if(sub_admin)
    {
     return res.status(401).json({message:'email exists'});   
    }
    else {
        var motdepasse_generated = generator.generate({length:10,numbers:true});
        localStorage.setItem('motdepass',motdepasse);
        const sub_admin= new sub_adminModel({
            _id:new mongoose.Types.ObjectId(),
            nom : req.body.nom,
            prenom:req.body.prenom,
            email:req.body.email,
            motdepasse:motdepasse_generated
        })
        sub_admin.save()
        .then(sub_admin=>{
            if(sub_admin){
           const transporter = nodeMailer.createTransport({
                    service: 'gmail',secure:false,    requireTLS: true,
                    auth: {
                      user: 'amaramootaz11@gmail.com',
                      pass: '25417290'
                        }
                        });
                    const mailOptions = {
                    from: 'amaramootaz11@gmail.com',
                    to: req.body.email,
                    subject: ' forsa account confirmation : ',
                    text: 'you have received your password :  '+motdepasse,
                    html:'<a href="http://localhost:4200/#/account/loginConfirm/'+sub_admin._id+"\">"+"verify me </a>"
                };
        
                transporter.mail(mailOptions,(err,sent)=>{
                    if(err){
                        return new Error("mail sending failed ");
                        
                    }
                    if(sent)
                    {
                        return res.status(201).json({message:'you have signed up successfully'});
                    }
                    else {
                        return res.status(401).json({message:' sign up failed'});
   
                    }
                });
            }
            else {
                return res.status(401).json({message:'sign up failed'})
            }
        })
        .catch(err=>{return res.status(500).json({err})})
}
})
.catch(err=>{return res.status(500).json({err})})
}