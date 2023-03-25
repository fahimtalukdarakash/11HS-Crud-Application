const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    department:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
});
const departments = new mongoose.model("departments",departmentSchema);
module.exports = departments;