// const mongoose = require("mongoose");

// // Function MongoDB database connection
//  const connectDb = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URL);
//         console.log(`Connected To Database ${mongoose.connection.host}`);
//     } catch (error) {
//         console.log("DB Error");
//     }
// };
//  module.exports=connectDb;


const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected To Database: ${mongoose.connection.host}`);
    } catch (error) {
        console.error("DB Error:", error.message);
        process.exit(1); // Stop the server on failure
    }
};

module.exports = connectDb;

