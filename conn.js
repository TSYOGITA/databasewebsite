const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/form",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:false
}).then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log("no connection");
})