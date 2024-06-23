var express = require('express');
var router = express.Router();
const usermodel = require(`./users`);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


//intermediate mongodb : 
/*
 Q1: how can i perform a case-insensitive search in Mongoose ?
 Q2: how do i found documents where an array field contains all of a set of values ?

 Q3:how can i search  for documents with a specific date range in Mongoose ?

 Q4:how can i filter documents based on the existence of a field in Mongoose ?

 Q5:how can i filter documents based on a specific field's length in Mongoose ?

*/

router.get(`/create`, async function(req, res){
  let userdata = await usermodel.create({
    username :  "harshit",
    nickname : "harshit office",
    description : "fees dedo bhois ",
    categories : ["fees", "fees", "card", "fines"],
  });
  res.send(userdata);
  })
  
  
  // Q1: how can i perform a case-insensitive search in Mongoose ?
  router.get(`/find`,  async function(req, res, next){
   let regex =  new RegExp("^harSH$", "i");
   // yeh regex in sensitive way me search krta hai or yeh us name ke us property se milte jhulte sab bando ko doon leta hai mtlb jiska name starting ka same hoga un sab ko doon lega baad ka bhalai alag kyo na ho..
  
  //  ^ - iska mtlb hota hai  shuruaat esi ho 
      //  ^hello$ 
      // ^hellooo$
    // $ -  iska mtlb hota hai ending esi ho 

    let user =  await usermodel.findOne({username: regex})
    res.send(user)
  })


  // Q2: how do i found documents where an array field contains all of a set of values ?
  router.get(`/find2`, async function(req, res){
    let user2  =  await usermodel.find({categories : { $all : ['fashion', 'dresses']} })
    res.send(user2);
  })
  
   
  // Q3:how can i search  for documents with a specific date range in Mongoose ?

  router.get(`/find3`, async function(req, res){
    var date1 = new Date('2023-11-09')
    var date2 = new Date('2023-11-12')
   let all =   await usermodel.find({datecreated :  { $gte : date1, $lte : date2}})
   res.send(all);
   
  })



  // Q4:how can i filter documents based on the existence of a field in Mongoose ?
     
  router.get(`/find4`, async function(req, res){
    let all = await usermodel.find({categories : {$exists : true}})
    res.send(all);
  })


  // Q5:how can i filter documents based on a specific field's length in Mongoose ? 

  router.get(`/last`, async function(req, res){
     let all = await usermodel.find({
         $expr : {
           $and :[
               {$gte : [{$strLenCP : '$nickname'},20 ]},
               {$lte : [{$strLenCP : '$nickname'},100]},
           ]
         }
     });

      res.send(all);
  })



module.exports = router;
