const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // check all fields 
        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ msg: "All fields are required", success: false });
        }

        // check user is already exists or not
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists", success: false });
        }

        // hash and salt with bcrypt
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    return res.status(500).json({ msg: 'server error try again after sometime', success: false });
                }

                const newuser = await UserModel.create({
                    name,
                    email,
                    password: hash
                });

                // set cookie
                const token = jwt.sign({ email, id: newuser._id }, process.env.JWT_SECRET, { expiresIn: '2d' });
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days

                });
                res.status(201).json({ msg: "you are registered !", newuser, success: true });

            });
        });
    } catch (error) {
        console.log(error);
    }
}

// login controller
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check all fields
        if (!email || !password) {
            return res
                .status(400)
                .json({ msg: "All fields are required", success: false });
        }

        // check user exists
        const user = await UserModel.findOne({ email }).select("+password");
        if (!user) {
            return res
                .status(400)
                .json({ msg: "Invalid credentials", success: false });
        }
        // check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ msg: "Invalid credentials", success: false });
        }
        //send userdata
        const logindata = await UserModel.findOne({ email }).select("-createdAt -updatedAt -__v");
        // create token
        const token = jwt.sign({ email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '2d' });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days
        });
        res.status(200).json({ msg: "Login successful", logindata, success: true });

    } catch (error) {
        console.log(error);
    }
}

//logout controller
exports.logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ msg: "logout", success: true })
}

exports.getallusers = async (req, res) => {
    try {
        const {id} = req.user
        const users = await UserModel.find({ _id: { $ne: id } }).select("-password");
        res.status(200).json({ users, success: true });
    } catch (error) {
        console.log(error);
    }
 
}
