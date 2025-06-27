const testUserController = (req, res) => {
    try {
          // Force an error for testing
        //   throw new Error("Something went wrong!");

        // res.status(200).json({
        //     success: true,
        //     message: 'Test user data API'(
        // });

        res.status(200).send("<h1>you are too good!!</h1>")
    } catch (error) {
        console.log("Error in test API:", error);
        res.status(500).json({
            success: false, 
            message: "Internal Server Error"
        });
    }
};

module.exports = { testUserController };
