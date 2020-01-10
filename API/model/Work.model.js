import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const workSchema = new Schema({
    title: {
        type: String,
        required: "Title is required",
        trim: true
    },
    detail: {
        type: String,
        trim: true
    },
    worker: {
        type: Schema.ObjectId,
        ref: "User",
    },
    commander: {
        type: Schema.ObjectId,
        ref: "User",
    },
    deadline: Date,
    datestatus: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    datesubmit: Date,
    status: {
        type: String,
        enum: ['send', 'proceed', 'success'],
        default: "send"
    },
    path: []
})

const workModel = mongoose.model("Work", workSchema);
export default workModel;