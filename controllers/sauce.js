const Sauce = require('../models/sauce');

exports.createSauce = (res,req,next)=>{
  const sauce = new Sauce({
    userId:req.body.userId,
    name:req.body.name,
    manufacturer:req.body.manufacturer,
    description:req.body.description,
    mainPepper:req.body.mainPepper,
    imageUrl:req.body.imageUrl,
    heat:req.body.heat,
    likes:0,
    dislikes:0,
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

console.log(createSauce);