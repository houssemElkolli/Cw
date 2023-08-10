import bcrypt from "bcrypt";
import User from "../models/User.js";


export const createUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: passwordHash,
            role: 'admin',
        })
        const savedUser = await newUser.save()
        const usersssss = await User.find({})

        res.status(201).json({ msg: 'User Created', savedUser , usersssss })

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, {password : 0 })
        res.status(200).json({ users: users });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

export const deleteUsers = async (req, res) => {
    try {
       const items =  req.body
        const users = await User.deleteMany({email : {$in : [...items]}})
        res.status(200).json({ users: users });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}