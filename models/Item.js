import mongoose from "mongoose"

const Schema = mongoose.Schema;

const itemScheme = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isActiveInput: {
        type: Boolean,
        required: true
    }
});

export default mongoose.model("Item", itemScheme);
