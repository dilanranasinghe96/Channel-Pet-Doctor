require("dotenv").config();
const express = require("express"); 
const app = express();

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