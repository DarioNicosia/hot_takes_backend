const Sauce = require('../models/sauce');

exports.createSauce = (res,req,next)=>{
  const url = req.protocol + '://' + req.get('host');
  req.body.sauce = JSON.parse(req.body.sauce);  
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

