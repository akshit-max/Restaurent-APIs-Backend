const express = require('express');
const connectDb = require('./config/db');
// .env

require("dotenv").config();
// console.log("MongoDB URL:", process.env.MONGO_URL); // Debugging




const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// DB connection
connectDb();

// Routes
app.use('/api/v1/test', require('./routes/testRoutes'));
app.use("/api/v1/auth", require("./routes/authroutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/restaurent", require("./routes/restaurentRoutes"));

app.get('/', (req, res) => {
  res.send('WELCOME TO FOOD RESTAURANT!!!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
