require("dotenv").config();
const express = require("express"); 
const app = express();

app.get("/api", (req, res) => {
    res.json({ success: 1,
        message: "Hello World" });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})