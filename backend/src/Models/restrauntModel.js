import mongoose from "mongoose";
const Schema = mongoose.Schema;
import menuSchema from 'menuModel';

const restrauntSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    foodType:{
        type: String,
        enum: ["Veg","Non-veg","Both"],
        required: true,
    },
    menu : [menuSchema],

},{timestamps:true})