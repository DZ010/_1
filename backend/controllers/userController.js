const bcrypt = require("bcrypt");
const db= require("../db/connect");


//user login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  const findUserQuery = "SELECT * FROM User WHERE username = ?";
  const [users] = await db.query(findUserQuery, [username]);
  
  //  If user doesn't exist
  if (users.length === 0) {
    return res.status(401).json({ message: "user not found Login failed" });
  }

  const user = users[0];

  //  Check password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Login failed" });
  }

  // Check if user is HR staff
  const checkHRQuery = `
    SELECT p.post_title 
    FROM Staff s
    JOIN Post p ON s.PostId = p.PostId 
    WHERE s.EmployeeId = ? AND p.post_title LIKE '%HR%'
  `;
  const [hrStaff] = await db.query(checkHRQuery, [user.employeeId]);

  //  If not HR staff
  if (hrStaff.length === 0) {
    return res.status(403).json({ message: "HR staff only" });
  }

  //  Create session
  req.session.user = {
    id: user.userId,
    username: user.username,
    isHR: true
  };

  res.json({ message: "Login successful" });
};

//logging out of the user
exports.logout=(req,res)=>{
 req.session.destroy((err) => {
  if (err) return res.status(500).json({ message: "Logout failed" });
  return res.json({ message: "Logged out" });
});

}

//registering the user

exports.register=async(req,res)=>{
    const {employeeId, username,password}= req.body

    const hashedpassword=  await bcrypt.hash(password,10);
    const sql= "insert into User(employeeId, username, password) values(?,?,?)";

    db.query(sql,[employeeId,username,hashedpassword],(err)=>{
      if(err) return res.status(500).json("error to create user");
      return res.status(200).json({message:"user creted successfully"})
    })
}

exports.profile=(req,res)=>{
    if (!req.session.user) return res.json({message:"user not logged in"})
   
    const employeeId = req.session.user.employeeId

    db.query("select * from Staff where emlployeeId=?", [employeeId],(err,result)=>{
        if (err) return res.status(500).json("failed to fetch user");

       return res.json(result[0])
    })
}