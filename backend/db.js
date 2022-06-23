const mongoose = require('mongoose')
const mongoUri = "mongodb://localhost:27017/inotebook"

const connectMongo = ()=>{
    mongoose.connect(mongoUri, ()=>{
        console.log("Mongo connect successfully.")
    })
}

module.exports = connectMongo;