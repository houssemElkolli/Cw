import mongoose from 'mongoose'

const PartnerSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "name is required"]
    },
    picturePath: {
        type: String,
        require: [true, "picture is required"]
    },

},
    { timestamps: true }
)

const  Partner = mongoose.model("partner " , PartnerSchema)
export default Partner;