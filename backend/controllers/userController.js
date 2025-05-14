import bcrypt from "bcrypt";
import db from "../db/connect.js";
import express from "express";
import { promisify } from "util";

const user = express.Router();
const query = promisify(db.query).bind(db); // Make db.query use async/await

// User login
user.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const users = await query("SELECT * FROM User WHERE username = ?", [username]);

    if (users.length === 0) {
      return res.status(401).json({ message: "User not found. Login failed" });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Login failed" });
    }

    const hrStaff = await query(`
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

    await query("INSERT INTO User(employeeId, username, password) VALUES (?, ?, ?)", 
      [employeeId, username, hashedPassword]);

    return res.status(200).json({ message: "User created successfully" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error creating user" });
  }
});

// Profile
user.get("/profile", async (req, res) => {
  if (!req.session.user) {
    return res.json({ message: "User not logged in" });
  }

  try {
    const employeeId = req.session.user.employeeId;
    const result = await query("SELECT * FROM Staff WHERE employeeId = ?", [employeeId]);

    return res.json(result[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to fetch user" });
  }
});

export default user;
