const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router  = express.Router();
const cors = require("cors");
const expressValidator = require('express-validator');

//Application middleware



router.use((req,res,next) =>{
    //console.log("Time:", Date.now());
    next();
})

router.get('/', (req,res) => {
 res.send("Home page");
});

router.get('/profile', (req,res) => {
    res.send("this is profile page");
});

router.get('/contact', (req,res) => {
    res.send("this is contact page");
});


// parse request data content type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({ extended:true }));
// add middleware before routes
app.use(express.json());
app.use(cors());
app.use('/', router);

//API'S
const loginRouter = require("./src/routes/login.router");
const product = require("./src/routes/product.router");

app.use('/api/v1/login', loginRouter);

app.use('/api/v1/product', product);

app.listen(process.env.port ||4000);
console.log("Site running at "+ (process.env.port ||4000));