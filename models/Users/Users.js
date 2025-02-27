import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        require: true,
        maxlength: 50,
        minlength: 10
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type :String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        // require: true
    },
    serviceLookingFor: {
        type: [String],
        require: true,
        enum: [
            "Software Engineer(Web)",
            "Software Engineer(Mobile)",
            "Graphic designer",
            "UI/UX Designer",
        ]
    },
    userVerified: {
        email: {
            type: String,
            default: false
        },
        phone: {
            type: String,
            default: false
        }
    },
    userVerifyToken : {
        email: {
            type: String
        },
        phone: {
            type: String,
        }
    }, 
},
{
    timestamps: true
});

let userModel = mongoose.model("users", userSchema, "users");

export default userModel