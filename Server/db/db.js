const mongoose = require('mongoose')

const connectDB = async () => {

  try {

    let connect = await mongoose.connect(process.env.DATABASE_URI)

    console.log(`MongoDB Connected : ${connect.connection.host}`)
    
  } catch (error) {
    console.log(`Database Connection Failed : ${error.message}`)
  }
}


module.exports = connectDB;