const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        // await mongoose.connect("mongodb+srv://molinadecastros:6ptOLabppsFRIGjz@proyectofinal-backend.oqvcsvp.mongodb.net/")
        console.log("Base de datos conectada exitosamente...")
    } catch (error) {
        console.log(`Error al conectar la base de datos - Error: ${error.message}`)
    }
}

module.exports = connect;