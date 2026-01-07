require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db.js");
const authRoutes=require('./routes/authRoutes.js');
const bookRoutes=require("./routes/bookRoutes.js");
const aiRoutes=require("./routes/aiRoutes.js");
const exportRoutes=require("./routes/exportRoutes.js")


const app = express();


//  Middleware to handle CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// Connect database
connectDB();

//  Middleware to parse JSON
app.use(express.json());

//  Static folder for uploads
app.use("/backend/uploads", express.static(path.join(__dirname, "uploads")));

console.log("authRoutes:", authRoutes);
console.log("bookRoutes:", bookRoutes);
console.log("aiRoutes:", aiRoutes);
console.log("exportRoutes:", exportRoutes);

//Routes here
app.use("/api/auth",authRoutes);
app.use("/api/books",bookRoutes);
app.use("/api/ai",aiRoutes);
app.use("/api/export",exportRoutes);




//  Start server
const PORT = process.env.PORT || 8000;
app.post("/test", (req, res) => {
  res.json({
    message: "SERVER POST WORKING",
    body: req.body,
  });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
