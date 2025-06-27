const usermodel = require("../models/usermodel");
const bcrypt = require("bcryptjs");

// get user info
const getUserController = async (req, res) => {
    try {
        const user = await usermodel.findById(req.body.id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }
        user.password = undefined;
        return res.status(200).send({
            success: true,
            message: "User get successfully",
            user,
        });
    } catch (error) {
        console.log("error");
        return res.status(500).send({
            success: false,
            message: "ERRor in get user api",
            error,
        });
    }
};

// UPDAte user
const updateUserController = async (req, res) => {
    try {
        const user = await usermodel.findById(req.body.id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "USER not found",
            });
        }
        const { userName, address, phone } = req.body;
        if (userName) user.userName = userName;
        if (address) user.address = address;
        if (phone) user.phone = phone;
        await user.save();
        res.status(200).send({
            success: true,
            message: "User updated successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in update user api",
            error,
        });
    }
};

// update password
const updatePasswordController = async (req, res) => {
    try {
        const user = await usermodel.findById(req.body.id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(500).send({
                success: false,
                message: "Invalid Credentials",
            });
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid old password",
            });
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password updated",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in password update API",
            error,
        });
    }
};

// reset password
const resetPasswordController = async (req, res) => {
    try {
        const { email, newpassword, answer } = req.body;
        if (!email || !newpassword || !answer) {
            return res.status(500).send({
                success: false,
                message: "plz provide all details",
            });
        }
        const user = await usermodel.findOne({ email, answer });
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "user not found or invalid answer",
            });
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newpassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "password reset successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in password reset api",
            error,
        });
    }
};

// delete profile
const deleteProfileController = async (req, res) => {
    try {
        await usermodel.findByIdAndDelete(req.params.id.trim());
        return res.status(200).send({
            success: true,
            message: "your account has been deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in account delete",
            error,
        });
    }
};

module.exports = {
    getUserController,
    updateUserController,
    updatePasswordController,
    resetPasswordController,
    deleteProfileController,
};
