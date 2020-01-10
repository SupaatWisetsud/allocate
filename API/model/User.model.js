import mongoose from 'mongoose';
import md5 from 'md5';
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: "Username is required",
        trim: true
    },
    password: {
        type: String,
        required: "Password is required",
        trim: true
    },
    firstname: {
        type: String,
        required: "First name is required",
        trim: true
    },
    lastname: {
        type: String,
        required: "Last name is required",
        trim: true
    },
    email: {
        type: String,
        required: "Email is required",
        unique: true,
        trim: true
    },
    img: {
        type: String,
        trim: true,
        default: "/img/system/user.png"
    },
    phone: {
        type: String,
        required: "Number phone is required",
        trim: String,
    },
    status: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
});

userSchema.pre('save', function(next){
    if(this.password){
        this.password = md5(this.password);
    }
    next();
});

const userModel = mongoose.model("User", userSchema);
export default userModel;