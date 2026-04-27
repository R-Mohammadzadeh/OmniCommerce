import mongoose, { Schema , model , models } from "mongoose";



const ReviewSchema = new mongoose.Schema({
    user: {type : String , required : true},
    rating:{type : Number , required:true },
    comment : {type : String , required:true} ,
    createdAt : {type:Date , default:Date.now}
})


const productSchema = new Schema({
    name : {
        type : String,
        required : true ,
        trim : true,

    },
    description : {
        type : String,
        required :true,
        trim:true,
    },
    price : {
        type : Number,
        required:true,
    },
    category : {
        type :String,
        required : true,
      

    },
    brand:{
        type:String,
        required :true,
        trim:true
    },
    stock : {
        type : Number,
        default :0
    },
    image : [{  // (Cloudinary)
        type : String,
    }],
    rating:{
        type:Number,
        default:0,
    },
    reviews : [ReviewSchema],
    numReviews : {
        type:Number,
        default:0,
    }
} , {timestamps:true})


const ProductsData = models.ProductsData || model('ProductsData', productSchema, 'productsDatas');
export default ProductsData;