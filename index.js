const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken");
const port = 3030;
const {connectDb} = require("./database/db.js");
const dotenv = require("dotenv");
const movieRoutes = require("./routes/movies.route.js");
const usersRoutes = require("./routes/users.route.js");
const usersLists = require("./users.json")
const carsLists = require("./cars.json");
const crudSample = require("./routes/crudSample.js");

dotenv.config();
app.use(express.json());
// app initial render 
app.get("/", (req , res)=>{
    res.json({message : "Initial rendering..."})
})

// jwt token 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}))

app.post("/login", (req , res) => {
    console.log(req.body, "Login request received");
    const user = usersLists.find(user => user.username === req.body.username)
    // console.log(user ,req.body.name, "user");
    if(user){
        if(user.password === req.body.password){
            const token = jwt.sign({UserId : user.id}, "secretKey");
            res.status(200).json({message : "Login Successful", token : token})
        }else{
            res.status(401).json({message : "Access Denied"})
        }
    }else{
        res.status(401).json({message : "Invalid users"})
    }
})

app.get("/name", (req,res)=>{
    res.json({name : 'Anandhan K'})
})

// workouts for basic 
const fs = require("fs");
const path = require("path");
const workersLists = require("./Workers.json");
app.post("/workers", (req,res)=>{
    const {employeName , employeNative, emailId} = req.body;
    try {
        const findExistsEmail = workersLists.find(item => item.emailId === emailId);
        
        if (findExistsEmail) {
            return res.status(200).json({ message: "Email already exists" });
        }

        workersLists.push({ employeName, employeNative, emailId });

        // Write the updated list back to the JSON file
        fs.writeFile(
            path.join(__dirname, "Workers.json"),
            JSON.stringify(workersLists, null, 2),
            (err) => {
                if (err) {
                    throw err; // Throws an error if write fails
                }
                res.status(200).json({ message: "User added successfully" });
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//Crud app
const crudRoutes = require("./routes/crudRoutes.js");
app.use("/api/crudapp", crudRoutes)
// routes 
app.use("/movies" , movieRoutes )
app.use("/users", usersRoutes )
app.use("/crudsample" , crudSample)

//Crud app with db 
const crudAppDb = require("./routes/crudAppDb.js")
const cors = require("cors")
app.use(cors());
app.use("/api", crudAppDb);

//login
const loginRoutes = require("./routes/loginRoutes.js");
app.use("/api/login", loginRoutes)

//product routes
const createProduct = require("./routes/product.js");
// app.use("api", createProduct)

// app listen 
app.listen(port , ()=>{
    console.log(`Server is running on http://localhost:${port}`);
    connectDb();
})