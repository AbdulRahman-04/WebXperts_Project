import mongoose from "mongoose"


let freelancerSchema = new mongoose.Schema({
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
    age: {
        type: Number,
        require: true
    },
    expertiseIn:{
        type: String,
        require: true
    },
    experience: {
        type :String,
        // require: true
    },
    profilePhoto:{
        type: String,
        // require: true
    },
    portfolio: {
        type: String,
        // require: true
    },
    bestWork: {
        type: [String],
    },
    freelancerVerified: {
        email :{
            type: String,
            default: false
        },
        phone: {
            type: String,
            default: false
        }
    },
    freelancerVerifyToken: {
        email: {
            type: String
        },
        phone: {
            type: String
        }
    }
})

let freelancerModel = mongoose.model("freelancers", freelancerSchema, "freelancers");

export default freelancerModel