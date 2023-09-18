import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import corsOptions from "./config/corsOptions.js";
import User from "./models/User.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import carouselRoutes from "./routes/carousel.js";
import sponsorRoutes from "./routes/sponsor.js";
import partnerRoutes from "./routes/partner.js";
import contactRoutes from "./routes/contact.js";
import { addItem, updateItem } from "./controllers/carousel.js";
import { addPartner, updatePartner } from "./controllers/partner.js";
import { addSponsor, updateSponsor } from "./controllers/sponsor.js";
import verifyToken from "./middleware/auth.js";

/* config */

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(cookieParser());
dotenv.config();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors(corsOptions));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* File Storage*/
export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});
export const upload = multer({ storage });

app.post("/carousel/addItem", [upload.single("picture"), verifyToken], addItem);
app.post("/carousel/updateItem",[upload.single("picture"), verifyToken], updateItem);
app.post("/partners/addItem", [upload.single("picture"), verifyToken], addPartner);
app.post("/partners/updatePartner", [upload.single("picture"), verifyToken], updatePartner);
app.post("/sponsors/addItem", [upload.single("picture"), verifyToken], addSponsor);
app.post("/sponsors/updateSponsor", [upload.single("picture"), verifyToken], updateSponsor);

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/carousel", carouselRoutes);
app.use("/sponsors", sponsorRoutes);
app.use("/partners", partnerRoutes);
app.use("/contacts", contactRoutes);

const PORT = process.env.PORT || 6001;

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port : ${PORT}`));
    })
    .catch((err) => console.log(`${err} did not connect`));

// mongoose.connect("mongodb://127.0.0.1:27017/cw", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     app.listen(PORT, () => console.log(`Server Port : ${PORT}`))
// }).catch((err) => console.log(`${err} did not connect`))

const data = { email: "cw@gmail.com", password: "cw" };

const salt = await bcrypt.genSalt();
const passwordHash = await bcrypt.hash(data.password, salt);
const find = await User.find({});
console.log(find.length);

if (find.length === 0) {
    try {
        const user = new User({
            email: data.email,
            password: passwordHash,
            role: "superAdmin",
        });

        const newuser = await user.save();

        console.log(newuser);
    } catch (error) {
        console.log(error);
    }
}
