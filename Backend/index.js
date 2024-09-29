
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const dotenv = require("dotenv");
const connection = require("./db"); // Import the database connection function
const adminAuth = require('./Routes/adminauth'); 
const studentAuth = require('./Routes/studentauth'); 
const HelpLineNumbers = require('./Routes/HelpLineNumbers'); 
const EmergencyNumbers = require('./Routes/EmergencyNumbers'); 



// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Database connection
connection();


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use('/uploads', express.static('uploads'));


// Routes setup
app.use("/api/admin", adminAuth);
app.use("/api/HelplineNumbers", HelpLineNumbers);
app.use("/api/Student", studentAuth);
app.use("/api/EmergencyNumbers", EmergencyNumbers);


// Define the port for the server
const port = process.env.PORT || 3000;


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
