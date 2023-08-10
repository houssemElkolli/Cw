import mongoose from 'mongoose'

const SponsorSchema = new mongoose.Schema({
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

const  Sponsor = mongoose.model("sponsor " , SponsorSchema)
export default Sponsor;