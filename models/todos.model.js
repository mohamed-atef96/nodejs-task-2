const mongoose = require('mongoose');
const {Schema} = mongoose;

const todoSchema = new Schema({
    content:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    createdBy:{
        id:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        }
    }
})

const todos = mongoose.model('todos',todoSchema);
module.exports = {todos}