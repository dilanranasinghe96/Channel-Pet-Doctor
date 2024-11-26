require("dotenv").config();
const express = require("express"); 
const app = express();
const db = require('./config/db');  // Import the database pool
const cors = require("cors");
app.use(cors());


db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log('Database connected!');
    connection.release(); // Release the connection back to the pool
});


const userRouter = require("./api/users/user.router");
const doctorRouter = require("./api/doctor/doctor.router");
const appointmentRouter = require("./api/appointment/appoint.router");
const medicRouter = require("./api/medic/medic.router");



app.use(express.json());

app.use("/user", userRouter);
app.use("/doctor", doctorRouter);
app.use("/appoint", appointmentRouter);
app.use("/medic",medicRouter);
app.use("/uploads", express.static("uploads"));



app.listen(process.env.APP_PORT, () => {
    console.log("Server is running on port :", process.env.APP_PORT);
})