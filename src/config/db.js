const mongoose = require('mongoose');

const connectDB = async ()=>{
    try {
        let res  = await mongoose.connect(process.env.MONGO_URI);

            if(res){
                console.log("Database Connected")
            }

        
    } catch (error) {
        console.log("Error while connecting to database", error);
    }
}

module.exports = connectDB;