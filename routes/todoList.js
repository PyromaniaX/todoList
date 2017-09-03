var express = require('express');
var router = express.Router();
var TodoListDAO = require('./../models/todoList.js');


var log = console.log.bind(this)

/* Router */
router.post('/', postItem)
router.delete('/:id', deleteItem)
router.put('/:id', putItem)
router.get('/', getItems)

/* add*/
function postItem(req,res){
  let item = req.body
  TodoListDAO.add(item, function (err,id) {
    if (err) {
      log(err)      
      res.send({success:false})
      return 
    }
    res.send({success:true,id});
  })
}

/* delete*/
function deleteItem(req,res){
  let id = req.params.id
  TodoListDAO.delete(id, function (err) {
    if (err) {
      log(err)      
      res.send({success:false})
      return
    }
    res.send({success:true});
  })
}

/* update*/
function putItem(req,res){
  let item = req.body
   item.id = req.params.id
  TodoListDAO.update(item, function (err) {
    if (err) {
      log(err)
      res.send({success:false})
      return
    }
    res.send({success:true});
  }) 
}

/* query*/
function getItems(req,res){
  TodoListDAO.query(function (err,items) {
    if (err) {
      log(err)      
      res.send({success:false})
      return
    }
    res.send({success:true,items});
  }) 
}
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
