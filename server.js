require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser')
const cacheInstance = require('./src/services/cache.service')

const authRoutes = require('./src/routes/auth.routes');
const productRoutes = require('./src/routes/product.routes');
const adminRoutes = require('./src/routes/admin.routes')
const connectDB = require('./src/config/db');
const path = require("path")

connectDB();

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

cacheInstance.on("connect",()=>{
    console.log("redis connected succesfully")
})

cacheInstance.on("error",(error)=>{
    console.log("Error in connecting redis",error)
})

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth',express.json(), express.urlencoded({ extended: true }), authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/admin',express.json(), express.urlencoded({ extended: true }), adminRoutes)



// cacheInstance.set("test_key", "hello");
// cacheInstance.get("test_key")
// .then(val => console.log("Redis OK:", val))
// .catch(err => console.error(err));


let PORT = process.env.PORT || 4000

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})