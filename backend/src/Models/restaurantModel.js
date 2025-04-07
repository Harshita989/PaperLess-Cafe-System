import mongoose from "mongoose";
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
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
    menu: [{
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'Menu'                             
    }],
},{timestamps:true});

export const Restaurant = mongoose.model('Restaurant', restaurantSchema);