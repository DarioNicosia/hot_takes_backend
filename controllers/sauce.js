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
    likes:'0',
    dislikes:'0',
    usersLiked:[],
    usersDisliked:[]
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
    likes:'0',
    dislikes:'0',
    usersLiked:[],
    usersDisliked:[]
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
    likes:'0',
    dislikes:'0',
    usersLiked:[],
    usersDisliked:[]
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
