import mongoose, { Schema , model , models } from "mongoose";







const ReviewSchema = new mongoose.Schema({
    user: {type : String , required : true},
    rating:{type : Number , required:true },
    comment : {type : String , required:true} ,
    createdAt : {type:Date , default:Date.now}
})

const UsersSchema = new Schema({
name :{
type:String,
required : true,
trim:true,
},

email:{
type :String,
required : true,
unique:true,
trim:true,
lowerCase:true,

},
password:{
type:String,
required:true    
},
phone:{
type:String,
required:true    
},
role:{
type:String,
enum :['user' , 'admin'],
default:'user',
},
image:{
    type:String,
},

otpCode :{
type:String,    
},

otpExpires :{
type:Date,    
},
lastLogin:{
    type:Date,
},
reviews : [ReviewSchema]
},{timestamps:true})


const UsersData = models.UsersData || model('UsersData' , UsersSchema ,'usersDatas' )
export default UsersData

