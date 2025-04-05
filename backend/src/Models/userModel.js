import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    WhatsappNo: {
        type: Number,
        required: true,
    }
},{
    timestamps :true
})

export const User = mongoose.model('User', userSchema)

