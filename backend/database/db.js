const mongoose = require("mongoose")

const url =""

const connection = ()=>{
    mongoose.connect(url,{
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    }).then(()=>console.log('MongoDB connected successfuly'))
    .catch((err)=>console.log("Connection Error! Error: " + err ))
}

module.exports = connection