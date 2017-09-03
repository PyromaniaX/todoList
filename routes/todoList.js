var express = require('express');
var router = express.Router();

var log = console.log.bind(this)

/* Router */
router.post('/', postItem)
router.delete('/:id', deleteItem)
router.put('/:id', putItem)
router.get('/', getItems)

/* add*/
function postItem(req,res){
  let item = req.body
  let id = Math.floor(Math.random() * 1000)+1000
  res.send({success:true,id:id})
}
/* delete*/
function deleteItem(req,res){
  log(req.params.id)
  res.send({success:true})  
}

/* update*/
function putItem(req,res){
  log(req.body.title)
  log(req.params.id)
  res.send({success:true})   
}

/* query*/
function getItems(req,res){
  let items = [{id:"1000", title:"烹羊", detail: "烹羊宰牛且为乐", priority: 0,dealt: false},
  {id:"1001", title:"会须", detail: "会须一饮三百杯", priority: 1,dealt: true},
  {id:"1002", title:"岑夫子", detail: "岑夫子，丹丘生，将进酒，君莫停",priority: 2, dealt: false},
  {id:"1003", title:"五花马", detail: "五花马，千金裘，呼儿将出换美酒",priority: 3, dealt: false},
]

  res.send({success:true,items}) 
}




router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
