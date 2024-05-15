const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGODB_URL = process.env.DATABASE;

const db = async () => {
    try {
        const con = await mongoose.connect(process.env.DATABASE);
        console.log(`mongoDB connected: ${con.connection.host}`);
    } catch (error) {
        console.error('COULD NOT CONNECT TO DATABASE:', error.message);
    }
};

module.exports = db;