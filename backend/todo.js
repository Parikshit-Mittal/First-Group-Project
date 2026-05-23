import mongoose from "mongoose"
const todoschema=mongoose.Schema({
    title:String,
    desc:String,
    status:Boolean
});
export const Todo=mongoose.model('Todo',todoschema)
