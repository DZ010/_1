import express  from "express";
import session  from "express-session";
import cors from "cors";
import db from "./db/connect.js"
import user from "./controllers/userController.js"
import post from "./controllers/postController.js"
const app= express();
const PORT = 2121;


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
app.use("/api/auth", user)
app.use("/api/post",post)
app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);
})