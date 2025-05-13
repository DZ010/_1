const bcrypt = require("bcrypt");
const db = require("../db/connect");

// User login
exports.login = (req, res) => {
  const { username, password } = req.body;

  const findUserQuery = "SELECT * FROM User WHERE username = ?";
  db.query(findUserQuery, [username], (err, users) => {
    if (err) return res.status(500).json({ message: "Database error" });

    // If user doesn't exist
    if (users.length === 0) {
      return res.status(401).json({ message: "User not found. Login failed" });
    }

    const user = users[0];

    // Compare password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ message: "Login failed" });
      }

      // Check if user is HR staff
      const checkHRQuery = `
        SELECT p.post_title 
        FROM Staff s
        JOIN Post p ON s.PostId = p.PostId 
        WHERE s.EmployeeId = ? AND p.post_title LIKE '%HR%'
      `;
      db.query(checkHRQuery, [user.employeeId], (err, hrStaff) => {
        if (err) return res.status(500).json({ message: "Database error" });

        if (hrStaff.length === 0) {
          return res.status(403).json({ message: "HR staff only" });
        }

        // Set session
        req.session.user = {
          id: user.userId,
          username: user.username,
          isHR: true
        };

        return res.json({ message: "Login successful" });
      });
    });
  });
};

// Logging out the user
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    return res.json({ message: "Logged out" });
  });
};

// Registering the user
exports.register = (req, res) => {
  const { employeeId, username, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: "Password hashing failed" });

    const sql = "INSERT INTO User(employeeId, username, password) VALUES (?, ?, ?)";
    db.query(sql, [employeeId, username, hashedPassword], (err) => {
      if (err) return res.status(500).json({ message: "Error creating user" });
      return res.status(200).json({ message: "User created successfully" });
    });
  });
};

// Profile
exports.profile = (req, res) => {
  if (!req.session.user) {
    return res.json({ message: "User not logged in" });
  }

  const employeeId = req.session.user.employeeId;

  db.query("SELECT * FROM Staff WHERE employeeId = ?", [employeeId], (err, result) => {
    if (err) return res.status(500).json({ message: "Failed to fetch user" });

    return res.json(result[0]);
  });
};
