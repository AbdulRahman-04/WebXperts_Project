import mongoose from "mongoose";

let UserSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        maxlength: 50,
        minlength: 5
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    phone:{
        type: String,
        require: true,
    },
    serviceLookingFor: {
        type: [String],  // Array of strings
        required: true,
        enum: [
            "Software Developer (Web)",
            "Software Developer (Mobile)",
            "Digital Marketer",
            "UI/UX Designer",
            "Graphic Designer",
            "SEO Specialist",
            "Content Writer",
            "Social Media Manager",
            "Data Analyst",
            "Cloud Engineer",
            "Cybersecurity Expert"
        ]  // Predefined options
    },
    userVerified: {
        email: {
            type: String,
            default: false
        },
        phone:{
            type: String,
            default: false
        }
    },
    userVerifyToken: {
        email: {
            type: String
        },
        phone: {
            type: String
        }
    }
},
{
 timestamps: true   
})

let userModel = mongoose.model("users", UserSchema, "Users")

export default userModel