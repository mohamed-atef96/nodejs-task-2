function connectDb(){
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/test');
    mongoose.connection.once('connected',()=>console.log('DB is connected'))
}
module.exports = {connectDb}