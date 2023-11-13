import Carousel from "../models/Carousel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const addItem = async (req, res) => {
    try {
        const { alt, type, order } = req.body;
        const picturePath = req.file.filename;
        if (order) {
            const newItem = new Carousel({ alt, picturePath, type, order });
            await newItem.save();
        } else {
            const newItem = new Carousel({
                alt,
                picturePath,
                type,
                order: 100,
            });
            await newItem.save();
        }

        res.status(200).json("item added");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const updateItem = async (req, res) => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const { _id, alt, type, order, picturePath } = req.body;

        if (req.file) {
            fs.unlinkSync(
                __dirname + "/../public/assets/" + picturePath,
                () => {
                    if (err) throw err;
                    else console.log("itemDeleted");
                }
            );

            const newPicturePath = req.file.filename;

            await Carousel.updateOne(
                { _id },
                {
                    alt,
                    picturePath: newPicturePath,
                    type,
                    order,
                }
            );

            res.status(201).json("item updated");
        } else {
            const foundItem = await Carousel.updateOne(
                { _id },
                {
                    alt,
                    type,
                    order,
                }
            );
            res.status(201).json("item updated");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};
export const swapCarouselItems = async (req, res) => {
    try {
        const ids = req.body;
        const items = await Carousel.find({ _id: { $in: [...ids] } }).sort({
            order: 1,
        });

        await Carousel.findByIdAndUpdate(items[0]._id, {
            order: items[1].order,
        });
        await Carousel.findByIdAndUpdate(items[1]._id, {
            order: items[0].order,
        });

        res.status(200).json({ msg: "succes" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const revertItemsOrder = async (req, res) => {
    const items = req.body;


    const revertedItems = await Carousel.updateMany(
        { _id: { $in: [...items] } },
        { $set: { order: 100 } }
    );

    res.status(201).json("updated");
};

export const getCarouselItems = async (req, res) => {
    try {
        const carouselItems = await Carousel.find({}).sort({
            order: 1,
            createdAt: -1,
        });

        res.status(200).json({ carouselItems });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const getCarouselItem = async (req, res) => {
    try {
        const itemNumber = req.query.itemNumber || 0;
        const itemPerPage = 1;

        const carouselItems = await Carousel.find({})
            .sort({ order: 1, createdAt: -1 })
            .limit(itemPerPage)
            .skip(itemNumber * itemPerPage);

        res.status(200).json({ carouselItems });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const sidePaginationItems = async (req, res) => {
    try {
        console.log(req.query.page);
        const page = req.query.page || 0;
        const itemPerPage = 5;

        const items = await Carousel.find({})
            .sort({ order: 1, createdAt: -1 })
            .limit(itemPerPage)
            .skip(page * itemPerPage);

        res.status(200).json({ items });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const gettingThumbnail = async (req, res) => {
    const filePath = req.params.videoName;

    if (!filePath) {
        return res.status(404).send("File not found");
    }
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const stat = fs.statSync(__dirname + "/../public/assets/" + filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunksize = end - start + 1;
        const file = fs.createReadStream(
            __dirname + "/../public/assets/" + filePath,
            { start, end }
        );
        const head = {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunksize,
            "Content-Type": "video/mp4",
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            "Content-Length": fileSize,
            "Content-Type": "video/mp4",
        };
        res.writeHead(200, head);
        fs.createReadStream(__dirname + "/../public/assets/" + filePath).pipe(
            res
        );
    }
};

export const streamingVideos = async (req, res) => {
    const filePath = req.params.videoName;

    if (!filePath) {
        return res.status(404).send("File not found");
    }
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const stat = fs.statSync(__dirname + "/../public/assets/" + filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunksize = end - start + 1;
        const file = fs.createReadStream(
            __dirname + "/../public/assets/" + filePath,
            { start, end }
        );
        const head = {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunksize,
            "Content-Type": "video/mp4",
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            "Content-Length": fileSize,
            "Content-Type": "video/mp4",
        };
        res.writeHead(200, head);
        fs.createReadStream(__dirname + "/../public/assets/" + filePath).pipe(
            res
        );
    }
};
export const getTotalNumber = async (req, res) => {
    try {
        const totalNumber = await Carousel.find({}).count();

        res.status(200).json({ totalNumber });
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteCarouselItems = async (req, res) => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const items = req.body;

        for await (const doc of Carousel.find({
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

        const carouselItems = await Carousel.deleteMany({
            _id: { $in: [...items] },
        });

        res.status(200).json({ carouselItems });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
