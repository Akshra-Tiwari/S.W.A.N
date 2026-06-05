const mongoose = require("mongoose");

const userSchema =
new mongoose.Schema({

uid:{
type:String,
required:true,
unique:true
},

email:{
type:String,
required:true,
unique:true
},

name:{
type:String,
default:""
},

role:{
type:String,
enum:[
"user",
"moderator",
"admin"
],
default:"user"
}

},{
timestamps:true
});

module.exports =
mongoose.model(
"User",
userSchema
);
