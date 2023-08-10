import Partner from "../models/Partner.js"




export const addPartner = async (req, res) => {
    try {
        const { name, picturePath } = req.body

        const newItem = new Partner({ name, picturePath })

        const item = await newItem.save()

        res.status(200).json({ item })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

export const getPartners = async (req, res) => {
    try {
        const partners = await Partner.find({})

        res.status(200).json({partners})

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const deletePartner = async (req, res) => {
    try {
        
        const items =  req.body
        const partner = await Partner.deleteMany({_id : {$in : [...items]}})
        res.status(200).json({partner})

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}