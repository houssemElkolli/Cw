import mongoose from "mongoose";


const ContactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"],
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    companyName: {
        type: String,
    },
    message: {
        type: String,
        required: [true, "Message is required"],
    },
    verified: {
        type: Boolean,
        default: false,
    },
    code: {
        type: String,
        required: true,
    }


},
    { timestamps: true }
)


const Contact = mongoose.model("Contact", ContactSchema);
export default Contact;