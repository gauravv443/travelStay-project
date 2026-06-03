const mongoose=require("mongoose");
const { default: passportLocalMongoose } = require("passport-local-mongoose");
const Schema=mongoose.Schema;

const pasportLocalMongoose=require("passport-local-mongoose");

const userSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    wishlist:[{
        type:Schema.Types.ObjectId,
        ref:"Listing"
    }]
});

userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('user',userSchema);
