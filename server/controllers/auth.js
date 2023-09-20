import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user)
            return res.status(400).json({ msg: "User does not exist. " });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: "Invalid credentials. " });

        const accessToken = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.ACCESS_JWT_SECRET,
            {
                expiresIn: "12h",
            }
        );
        const refreshToken = jwt.sign(
            { email: user.email },
            process.env.REFRECH_JWT_SECRETE,
            { expiresIn: "1d" }
        );
        res.cookie("jwt", refreshToken, {
            httpOnly: true, //accessible only by web server
            secure: true, // https
            sameSite: "None", //cross-site cookie
            maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiry in one week
        });
        res.status(200).json({ accessToken , user : { email : user.email , role : user.role} });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err);
    }
};

export const refresh = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });
    const refreshToken = cookies.jwt;

    jwt.verify(
        refreshToken,
        process.env.REFRECH_JWT_SECRETE,
        async (err, decoded) => {
            try {
                if (err) return res.status(403).json({ mesaage: "Forbidden" });
                const user = await User.findOne({ email: decoded.email });
                if (!user)
                    return res.status(401).json({ message: "Unauthorized" });
                const accessToken = jwt.sign(
                    { id: user._id, email: user.email, role: user.role },
                    process.env.ACCESS_JWT_SECRET,
                    {
                        expiresIn: "12h",
                    }
                );
                res.json({ accessToken , user : { email : user.email , role : user.role} });
            } catch (error) {
                res.status(500).json({ error });
            }
        }
    );
};

export const logout = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(204); //No content

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

    res.json({ message: "Cookie cleared" });
};
