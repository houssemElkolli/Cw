import mongoose from "mongoose";


const CarouselSchema = new mongoose.Schema({
    alt: {
        type: String,

    },
    picturePath: {
        type: String,
        required: [true, "Picture is required"],
    },
    type: { 
        type: String,
        required: [true, "Picture is required"],
    },
    order : {
        type: String,
        default : 100
    },
    video: {
        type: Boolean,
        default: true,
    },
    sound : {
        type: Boolean,
        default: false,
    }

},
    { timestamps: true }
)


const Carousel = mongoose.model("Carousel", CarouselSchema);
export default Carousel;