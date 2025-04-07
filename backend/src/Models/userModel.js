import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    whatsappNo: {
        type: String,
        required: true,
    }
},{
    timestamps :true
});

export const User = mongoose.model('User', userSchema);