var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todoList')
exports.mongoose = mongoose;