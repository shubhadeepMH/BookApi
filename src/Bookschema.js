const mongoose=require('mongoose')
// create book data Schema 
const Schema = mongoose.Schema;

const Booklistschema=new Schema({
        name:{
                type:String,
                require:true
        },
        imageUrl:String,
        Author:String,
        pages:Number,
        price:Number
})
//create collection for data base
const Books= new mongoose.model("Book",Booklistschema)
module.exports=Books