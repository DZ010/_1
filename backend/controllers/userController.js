import bcrypt from "bcrypt";
import db from "../db/connect.js";
import express from "express";

const user = express.Router();



user.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const [users] = await db.query("SELECT * FROM User WHERE username = ?", [username]);

    if (users.length === 0) {
      return res.status(401).json({ message: "User not found. Login failed" });
    }

    const user = users[0];

    if (!user.password) {
      return res.status(500).json({ message: "User has no password stored." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Login failed" });
    }

    const [hrStaff] = await db.query(`
      SELECT p.post_title 
      FROM Staff s
      JOIN Post p ON s.PostId = p.PostId 
      WHERE s.EmployeeId = ? AND p.post_title LIKE '%HR%'`, 
      [user.employeeId]
    );

    if (hrStaff.length === 0) {
      return res.status(403).json({ message: "HR staff only" });
    }

    req.session.user = {
      id: user.userId,
      username: user.username,
      isHR: true,
      employeeId: user.employeeId
    };

    return res.json({ message: "Login successful" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});


// Logout
user.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    return res.json({ message: "Logged out" });
  });
});

// Register
user.post("/register", async (req, res) => {
  try {
    const { employeeId, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query("INSERT INTO User(employeeId, username, password) VALUES (?, ?, ?)", 
      [employeeId, username, hashedPassword]);

    return res.status(200).json({ message: "User created successfully" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error creating user" });
  }
});

user.get("/getAllUsers",async(req,res)=>{
 try{
     const sql= "SELECT username,Staff.FirstName, Staff.LastName from User INNER JOIN Staff ON User.employeeId=Staff.employeeId"
     const [result]= await db.query(sql)
     if(result.length==0){
      return res.status(400).json({message:"no users inserted"})

     }
     return res.status(200).json({message:"all users",data:result})
     
 }
 catch(err){
  console.log(err)
  return res.status(500).json("server error")
 }
})

user.get("/check", (req, res) => {
  if (req.session.user) {
    return res.status(200).json({ loggedIn: true, user: req.session.user });
  } else {
    return res.status(401).json({ loggedIn: false, message: "Not logged in" });
  }
});

export default user;
