const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const cors = require("cors");
const Project = require("./models/Project");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((error) => console.log("MongoDB Connection Error:", error));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Portfolio Backend is Running!");
});
app.get("/projects", async (req, res) => {
    try {
        const projects = await Project.find();
        console.log("PROJECTS:", projects);
        res.json(projects);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching projects",
            error: error.message
        });
    }
});

app.post("/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        console.log("Contact Message Received:");
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Message:", message);

        res.status(201).json({
            message: "Message sent successfully!"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error sending message",
            error: error.message
        });
    }
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});