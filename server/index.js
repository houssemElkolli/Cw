import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import User from "./models/User.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import carouselRoutes from "./routes/carousel.js";
import sponsorRoutes from "./routes/sponsor.js";
import partnerRoutes from "./routes/partner.js";
import contactRoutes from "./routes/contact.js";
import { addItem } from "./controllers/carousel.js";
import { addPartner } from "./controllers/partner.js";
import { addSponsor } from "./controllers/sponsor.js";


/* config */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))


app.use(cors({
    // origin: "http://192.168.1.89:5173" // frontend URI (ReactJS)
}))
app.use("/assets", express.static(path.join(__dirname, "public/assets")))


/* File Storage*/
export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${Date.now()}_${file.originalname}`);
    }
})
const upload = multer({ storage })

app.post("/carousel/addItem", upload.single("picture"), addItem)
app.post("/partners/addItem", upload.single("picture"), addPartner)
app.post("/sponsors/addItem", upload.single("picture"), addSponsor)


// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/carousel", carouselRoutes);
app.use("/sponsors", sponsorRoutes);
app.use("/partners", partnerRoutes);
app.use("/contacts", contactRoutes);




const PORT = process.env.PORT || 6001

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port : ${PORT}`))
}).catch((err) => console.log(`${err} did not connect`))

// mongoose.connect("mongodb://127.0.0.1:27017/cw", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     app.listen(PORT, () => console.log(`Server Port : ${PORT}`))
// }).catch((err) => console.log(`${err} did not connect`))



const data = { email: "cw@gmail.com", password: "cw" }

const salt = await bcrypt.genSalt();
const passwordHash = await bcrypt.hash(data.password, salt);
const find = await User.find({})
console.log(find.length);

if (find.length === 0) {
    try {
        const user = new User({
            email: data.email,
            password: passwordHash,
            role: "superAdmin"
        })

        const newuser = await user.save()

        console.log(newuser)
    } catch (error) {
        console.log(error);

    }
}

