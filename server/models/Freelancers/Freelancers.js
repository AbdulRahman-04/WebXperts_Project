import mongoose from "mongoose";

let FreelancerScehma = new mongoose.Schema(
  {
    fullname: {
      type: String,
      require: true,
      maxlength: 50,
      minlength: 5,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    expertiseIn: {
      type: String,
      require: true,
      maxlength: 35,
    },
    experience: {
      type: String,
      require: true,
    },
    hourlyRate: {
      type: String,
      reuire: true,
    },
    portfolioURL: {
      type: String,
      require: true,
    },
    profilePhoto: {
      type: String,
      require: true,
    },
    freelancerVerified: {
      email: {
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
  },
  {
    timestamps: true,
  }
);

let FreelancerModel = mongoose.model(
  "freelancers",
  FreelancerScehma,
  "Freelancers"
);

export default FreelancerModel;
