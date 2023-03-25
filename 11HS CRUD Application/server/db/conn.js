const mongoose = require("mongoose");
const DB= "mongodb+srv://Fahim:akash1508013@cluster0.dcdis.mongodb.net/11HS?retryWrites=true&w=majority";

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log("connection start")).catch((error)=> console.log(error.message));
