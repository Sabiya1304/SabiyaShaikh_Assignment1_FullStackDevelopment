const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Contact = require("./models/Contact");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(function () {
        console.log("MongoDB connected");
    })
    .catch(function (error) {
        console.log("MongoDB connection failed");
        console.log(error);
    });

app.get("/api/health", function (req, res) {
    res.json({
        success: true,
        message: "Server is running"
    });
});

app.post("/api/contact", async function (req, res) {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const contact = new Contact({
            name: name.trim(),
            email: email.trim(),
            subject: subject.trim(),
            message: message.trim()
        });

        await contact.save();

        res.status(201).json({
            success: true,
            message: "Message received successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    console.log("Server is running on port " + PORT);
});