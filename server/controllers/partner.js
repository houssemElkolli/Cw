import Partner from "../models/Partner.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const addPartner = async (req, res) => {
    try {
        const { name } = req.body;

        const picturePath = req.file.filename;

        const newItem = new Partner({ name, picturePath });

        const item = await newItem.save();

        res.status(200).json({ item });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updatePartner = async (req, res) => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const { _id, name, picturePath } = req.body;

        if (req.file) {
            fs.unlinkSync(
                __dirname + "/../public/assets/" + picturePath,
                () => {
                    if (err) throw err;
                    else console.log("itemDeleted");
                }
            );

            const newPicturePath = req.file.filename;

            await Partner.updateOne(
                { _id },
                {
                    name,
                    picturePath: newPicturePath,
                }
            );

            res.status(201).json("item updated");
        } else {
            const foundItem = await Partner.updateOne(
                { _id },
                {
                    name,
                }
            );
            res.status(201).json("item updated");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

export const getPartners = async (req, res) => {
    try {
        const partners = await Partner.find({});

        res.status(200).json({ partners });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deletePartner = async (req, res) => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const items = req.body;

        for await (const doc of Partner.find({
            _id: {
                $in: [...items],
            },
        })) {
            fs.unlinkSync(
                __dirname + "/../public/assets/" + doc.picturePath,
                () => {
                    if (err) console.log(err);
                    else console.log("itemDeleted");
                }
            );
        }
        const partner = await Partner.deleteMany({ _id: { $in: [...items] } });

        res.status(200).json({ partner });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
