import Carousel from "../models/Carousel.js"




export const addItem = async (req, res) => {
    try {
        const { alt, type, order } = req.body
        const picturePath = req.file.filename

        const newItem = new Carousel({ alt, picturePath, type, order })

        const item = await newItem.save()

        res.status(200).json({ item })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}
export const swapCarouselItems = async (req, res) => {
    try {
        const ids = req.body
        const items = await Carousel.find({ _id: { $in: [...ids] } }).sort({ order: 1 })

        await Carousel.findByIdAndUpdate(items[0]._id, { order: items[1].order })
        await Carousel.findByIdAndUpdate(items[1]._id, { order: items[0].order })

        res.status(200).json({ msg : 'succes' })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

export const getCarouselItems = async (req, res) => {
    try {
        const carouselItems = await Carousel.find({}).sort({ order: 1 })

        res.status(200).json({ carouselItems })

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const deleteCarouselItems = async (req, res) => {
    try {

        const items = req.body
        const carouselItems = await Carousel.deleteMany({ _id: { $in: [...items] } })
        res.status(200).json({ carouselItems })

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}