const mongoose=require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/testapp1");

const trainSchema = mongoose.Schema({
    source:String,
    dest:String,
    deptime:String,
    retime:String
})

module.exports=mongoose.model('user',trainSchema);