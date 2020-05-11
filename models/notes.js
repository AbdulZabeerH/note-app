const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var noteSchema = new Schema({
    email:{
        type:String
    },
    notes:{
       type:Array,
       default: [],
    }
})

module.exports = mongoose.model("notes", noteSchema);