import Sponsor from "../models/Sponsor.js"




export const addSponsor = async (req, res) => {
    try {
        const { name, picturePath } = req.body

        const newItem = new Sponsor({ name, picturePath })

        const item = await newItem.save()

        res.status(200).json({ item })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

export const getSponsors = async (req, res) => {
    try {
        const sponsors = await Sponsor.find({})

        res.status(200).json({sponsors})

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const deleteSponsor = async (req, res) => {
    try {
        
        const items =  req.body
        const sponsor = await Sponsor.deleteMany({_id : {$in : [...items]}})
        res.status(200).json({sponsor})

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}