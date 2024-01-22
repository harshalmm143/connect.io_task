const mongoose = require("mongoose")

const connectionDB = async () => {
    const URL = process.env.URL + process.env.DATABASE_NAME
    mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log(`${process.env.DATABASE_NAME} Database Connected Successfully`)
        }).catch(() => {
            console.log("Database not connected please check database URL")
        });
}
module.exports = connectionDB;