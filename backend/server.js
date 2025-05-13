const express = require("express");
const session = require("express-session");
const cors= require("cors");
const app= express();
const PORT = 2121;

require("./db/connect")

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(session({
  secret: "ahahha",
  resave: false,
  saveUninitialized: false
}));

//routes
app.use('/api/auth', require("./routes/userRoutes"))
app.use('/api/post',require("./routes/postRoutes"))
app.use("/api/staff", require("./routes/staffRoutes"))

app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);
})