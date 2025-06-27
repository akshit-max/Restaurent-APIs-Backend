const restaurentModel = require("../models/restaurentModel");

// Create restaurant
const CreateRestaurentController = async (req, res) => {
    try {
        // Destructure all fields from req.body
        const {
            title,
            imageUrl,
            food,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            address,
            coords,
        } = req.body;

        // Validation
        if (!title || !address) {
            return res.status(400).send({
                success: false,
                message: "Provide title and address",
            });
        }

        // Create restaurant document object
        const newRestaurant = new restaurentModel({
            title,
            imageUrl,
            food,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            address,
            code,
            coords,
        });

        // Save restaurant to DB
        await newRestaurant.save();
        res.status(201).send({
            success: true,
            message: "NEW Restaurant created successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Create Restaurant API",
            error,
        });
    }
};

// Get all restaurants
const getallRestaurentController = async (req, res) => {
    try {
        const restaurents = await restaurentModel.find({});

        // Check if no restaurant found
        if (!restaurents || restaurents.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No restaurants available",
            });
        }

        res.status(200).send({
            success: true,
            totalcount: restaurents.length,
            restaurents,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get all restaurants API",
            error,
        });
    }
};

// Get restaurant by ID
const getrestaurentbyidController = async (req, res) => {
    try {
        // Trim and validate ID
        const restaurentid = req.params.id.trim();

        // Check if ID is provided
        if (!restaurentid) {
            return res.status(400).send({
                success: false,
                message: "Please provide a valid restaurant ID",
            });
        }

        // Find restaurant by ID
        const restaurent = await restaurentModel.findById(restaurentid);

        // Check if restaurant is not found
        if (!restaurent) {
            return res.status(404).send({
                success: false,
                message: "No restaurant found with this ID",
            });
        }

        res.status(200).send({
            success: true,
            restaurent,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get restaurant by ID API",
            error,
        });
    }
};
const deletedRestaurentController = async (req, res) => {
    try {
        const restaurentid = req.params.id.trim()
        // validation
        if (!restaurentid) {
            return res.status(400).send({
                success: false,
                message: "Please provide a valid restaurant ID",
            });
        }
        const deleted = await restaurentModel.findByIdAndDelete(restaurentid)
        if (!deleted) {
            return res.status(404).send({
                success: false,
                message: "No restaurant found to delete with this ID",
            });
        }

        res.status(200).send({
            success: true,
            message: "Restaurant deleted successfully",
            deleted,
        });
    } 
        
     catch (error) {
    console.log(error),
        res.status(500).send({
            success: false,
            message: "Error in Restaurent Delete API",
            error,
        })

}

}

module.exports = {
    CreateRestaurentController,
    getallRestaurentController,
    getrestaurentbyidController,
    deletedRestaurentController

};
