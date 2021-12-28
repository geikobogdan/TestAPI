require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const CLIENT = process.env.CLIENT;
const DB_MANE = process.env.DB_MANE;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DEV_PORT = process.env.DEV_PORT;

module.exports = { JWT_SECRET, CLIENT, DB_MANE, USER, PASSWORD, DEV_PORT };
