const mongoose=require("mongoose");


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,

    },
    lastName:{
        type:String,
        required:true,
        trim:true,

    },
    mobile:{
        type:String,
        required:true,
        trim:true,
        max:10,

    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
   
    password:{
        type:String,
        required:true,
    },

    token: {
        type: String,
      },
    todos: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Todo",
        },
      ]
})
module.exports=mongoose.model("User",userSchema);