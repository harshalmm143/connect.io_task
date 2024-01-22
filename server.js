const express = require("express")
const bodyparser = require("body-parser")
const connectionDB = require("./src/config/Database")
const cors = require("cors")
require('dotenv').config()

const departmentRoutes = require('./src/routes/DepartmentsRoutes')
const employeeRoutes = require('./src/routes/EmployeeRoutes')
const payoutRotues = require('./src/routes/PayoutRoutes')
const queryRoutes = require('./src/routes/QueryRoutes')

const server = express()
server.use(cors());
server.use(bodyparser.json())
server.use(bodyparser.urlencoded({ extended: false }))
connectionDB()

server.get('/', (req, res) => {
    res.send("Happy Coding")
})

server.use('/api', departmentRoutes)
server.use('/api', employeeRoutes)
server.use('/api', payoutRotues)
server.use('/api', queryRoutes)



const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



// create .env file 

// PORT = 5000
// URL = "mongodb://127.0.0.1:27017/"
// DATABASE_NAME = "connect_io_empDatabase"