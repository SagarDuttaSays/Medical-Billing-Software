const mongoose = require('mongoose');
const chalk = require('chalk');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${chalk.cyan.underline(conn.connection.host)}`);
  } catch (error) {
    console.error(`Error: ${chalk.red.underline.bold(error.message)}`);
    process.exit(1);
  }
};

module.exports = connectDB;
