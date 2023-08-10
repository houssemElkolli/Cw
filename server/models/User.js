import mongoose from "mongoose"


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    role: {
        type: String,
        required: [true, "Role is required"],
    },
},

    { timestamps: true }
)

const User = mongoose.model("User", UserSchema);
export default User;


