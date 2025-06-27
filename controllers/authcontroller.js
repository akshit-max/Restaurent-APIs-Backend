const userModel = require("../models/usermodel");
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')

// Register Controller
const registerController = async (req, res) => {
    try {
        const { userName, email, password, phone, address ,answer} = req.body;

        // Validation
        if (!userName || !email || !password || !phone || !address || !answer) {
            return res.status(400).send({
                success: false,
                message: "Please provide all details"
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "Email already registered, please login"
            });
        }
        // hashing password!!!!!!!
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        // Create new user
        const user = await userModel.create({
            userName,
            email,
            password: hashedPassword,
            address,
            phone,
            answer

        });

        res.status(201).send({
            success: true,
            message: "Successfully registered",
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Register API",
            error: error.message
        });
    }
};

// Login Controller
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login Request Data:", req.body);


        // Validation
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please provide email and password"
            });
        }

        // Check user
        const user = await userModel.findOne({ email});
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }
        // check new password | compare password
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(500).send({
                success: false,
                message:"Invalid Credentials",

            });
        }
        // token
        const token = JWT.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn: "7d"
        });
        // hides password field in  postman 
        user.password=undefined;

        res.status(200).send({
            success: true,
            message: "Login successfully",
            token,
            user,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login API",
            error: error.message
        });
    }
};

module.exports = { registerController, loginController };
