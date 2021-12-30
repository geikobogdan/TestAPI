require('dotenv').config();

const { JWT_SECRET } = process.env;
const { CLIENT } = process.env;
const { DB_MANE } = process.env;
const { USER } = process.env;
const { PASSWORD } = process.env;
const { DEV_PORT } = process.env;

module.exports = {
  JWT_SECRET, CLIENT, DB_MANE, USER, PASSWORD, DEV_PORT,
};
