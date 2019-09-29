const Sauce = require('../models/sauce');
const fs = require('fs');


exports.createSauce = (req,res,next)=>{
  req.body.sauce = JSON.parse(req.body.sauce);   
  const url = req.protocol + '://' + req.get('host');
  const sauce = new Sauce({
    userId:req.body.sauce.userId,
    name:req.body.sauce.name,
    manufacturer:req.body.sauce.manufacturer,
    description:req.body.sauce.description,
    mainPepper:req.body.sauce.mainPepper,
    imageUrl:url + '/images/' + req.file.filename,
    heat:req.body.sauce.heat,
    likes:0,
    dislikes:0,
    usersLiked:[ ],
    usersDisliked:[ ]
  });
  sauce.save().then(
      ()=>{
          res.status(201).json({
              message:'sauce added successfully'
          })
      }
  ).catch(
      (error)=>{
          res.status(400).json({
              error:error
          });
      }
  );
};



exports.getAllSauces= (req,res,next)=>{
    Sauce.find().then(
        (sauces) =>{
          res.status(200).json(sauces);
          
        }
      ).catch(
        (error)=>{
          res.status(400).json(error);
        }
      )
}


exports.getOneSauce =(req,res,next)=>{
  Sauce.findOne({
    _id:req.params.id
  }).then(
    (sauce)=>{
      res.status(200).json(sauce)
    }
  ).catch(
    (error)=>{
      res.status(400).json({
        error:error
      })
    }
  )
}

exports.modifySauce =(req,res,next)=>{
  let sauce = new Sauce({_id:req.params.id});
  if(req.file){
    req.body.sauce = JSON.parse(req.body.sauce);   
    const url = req.protocol + '://' + req.get('host');
    sauce = {
    _id:req.params.id,  
    userId:req.body.sauce.userId,
    name:req.body.sauce.name,
    manufacturer:req.body.sauce.manufacturer,
    description:req.body.sauce.description,
    mainPepper:req.body.sauce.mainPepper,
    imageUrl:url + '/images/' + req.file.filename,
    heat:req.body.sauce.heat,
    
  };
  } else {
    sauce = {
    _id:req.params.id,
    userId:req.body.userId,
    name:req.body.name,
    manufacturer:req.body.manufacturer,
    description:req.body.description,
    mainPepper:req.body.mainPepper,
    heat:req.body.heat,
    
  }
}
  Sauce.updateOne({_id:req.params.id},sauce).then(
    ()=>{
      res.status(200).json({
        message:'sauce modified succesfully'
      })
    }
  ).catch(
    (error)=>{
      res.status(400).json({
        error:error
      });
    }
  );
};




exports.deleteSauce = (req,res,next)=>{
  Sauce.findOne({_id:req.params.id}).then(
    (sauce)=>{
      const filename = sauce.imageUrl.split('/images/')[1]
      fs.unlink('images/'+ filename, ()=>{
        Sauce.deleteOne({_id:req.params.id}).then(
          ()=>{
            res.status(200).json({
              message:'sauce deleted'
            })
          }
        ).catch(
          (error)=>{
            res.status(400).json({
              error:error
            })
          }
        )
      })
    }
  ).catch(
    (error)=>{
      res.status(400).json({
        error:error
      })
    }
  )
  
};




//prova due

exports.likeSauce = (req,res,next) =>{
  Sauce.findOne({_id:req.params.id}).then(
    (sauce)=>{
      if(req.body.like == 1){
            sauce.likes++;
            sauce.usersLiked.push(req.body.userId);
            sauce.save().then(
              ()=>{
                res.status(200).json({
                  message:'you liked the sauce'
                })
              }
            ).catch(
              (error)=>{
                res.status(400).json({
                  error:error
                })
              }
            )
          
        }else if(req.body.like == 0){
          if(sauce.usersLiked.includes(req.body.userId)){
            const arrayUsersLiked = sauce.usersLiked.indexOf(req.body.userId)
            sauce.usersLiked.splice(arrayUsersLiked, 1);
            sauce.likes--;
            sauce.save().then(
              ()=>{
                res.status(200).json({
                  message:'like removed'
                })
              }
            ).catch(
              (error)=>{
                res.status(400).json({
                  error:error
                })
              }
            )
          }if(sauce.usersDisliked.includes(req.body.userId)){
            const arrayUsersDisliked = sauce.usersDisliked.indexOf(req.body.userId)
            sauce.usersDisliked.splice(arrayUsersDisliked, 1);
            sauce.dislikes--;
            sauce.save().then(
              ()=>{
                res.status(200).json({
                  message:'dislike removed'
                })
              }
            ).catch(
              (error)=>{
                res.status(400).json({
                  error:error
                })
              }
            )
          }
        }else if(req.body.like == -1){
          sauce.usersDisliked.push(req.body.userId);
          sauce.dislikes++;
          sauce.save().then(
            ()=>{
              res.status(201).json({
                message:'you disliked the sauce'
              })
            }
          ).catch(
            (error)=>{
              res.status(400).json({
                error:error
              })
            }
          )
        }
      }
    
  ).catch(
    (error)=>{
      res.status(400).json({
        error:error
      })
    }
  )
}
