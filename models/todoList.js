var mongodb = require('./mongodb')
var Sequence = require('./sequence');
var Schema = mongodb.mongoose.Schema

var log = console.log.bind(this)

var TodoListSchema = new Schema({
        id : {type:Number,index:{unique:true}},
     title : String,
    detail : String,
  priority : Number,
     dealt : Boolean
    })
TodoListSchema.pre('save', function(next) {
  var self = this;
  if( self.isNew ) {
      Sequence.increment('todo',function (err, result) {
          if (err) throw err;
          self.id = result.value.next;
          next();
      });
  } else {
      next();
}
})
var TodoList = mongodb.mongoose.model("TodoList",TodoListSchema)
/**
 * DAO
 */
var TodoListDAO = function () {};
//add
TodoListDAO.prototype.add = function (item, callback) {
  new TodoList(item).save(function (err,item) {
      callback(err,item.id)
    });
  };
//delete
TodoListDAO.prototype.delete = function (id,callback){
  TodoList.findOneAndRemove({"id":id}, function(err) {
      callback(err)
  });
}
//update
TodoListDAO.prototype.update = function (item,callback){
  TodoList.findOneAndUpdate({"id":item.id},item, function(err) {
      callback(err)
  });
}
//query
TodoListDAO.prototype.query = function (callback){
  TodoList.find({}, function(err, items) {
    callback(err,items)
  })
}


module.exports = new TodoListDAO();