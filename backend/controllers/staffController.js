import express from "express"
import db from "../db/connect.js"
const  staff = express.Router();
staff.get("/getAllStaff", async (req,res)=>{
    try{
    const sql= "select employeeId , FirstName,lastName,Gender,DateOfBirth,Email,Phone,Department,HireDate,Salary,status,address,post from Staff inner join Post on staff.post=post.PostId"
    const result = await db.query(sql)
    return res.status(200).json({message:"all staff members", data:result})
    }
    catch(err){

    }
});

staff.post("/createStaff",(req,res)=>{
    const {PostId,FirstName,LastName,Gender,DateOfBirth,Email,Phone,Department,HireDate,Salary,Status,Address}=req.body

    const sql = "insert into Staff (PostId,FirstName,LastName,Gender,DateOfBirth,Email,Phone,Department,HireDate,Salary,Status,Address) values(?,?,?,?,?,?,?,?,?,?,?,?)"
    db.query(sql,[PostId,FirstName,LastName,Gender,DateOfBirth,Email,Phone,Department,HireDate,Salary,Status,Address],(err,result)=>{
        if(err) return res.status(500).json({message:"failed to insert"})
        res.status(200).json({message:"inserted successfully"})    
    })
})
staff.put("/updateStaff", (req,res)=>{
    const{id}= req.params
    const {post,FirstName,LastName,Gender,DateOfBirth,Email,Phone,Department,HireDate,Salary,Status,Address}=req.body
    
    const sql= "update Staff set post=?,FirstName=?,LastName=?,Gender=?,DateOfBirth=?,Email=?,Phone=?,Department=?,HireDate=?,Salary=?,Status=?,Address=? where employeeId=? ";
    db.query(sql,[post,FirstName,LastName,Gender,DateOfBirth,Email,Phone,Department,HireDate,Salary,Status,Address,id],(err)=>{
        if (err) return res.status(500).json({message:"failed to insert"})
        return res.status(200).json({message:"updated successfully"})    
    })

})

staff.delete("/deleteStaff",(req,res)=>{
    const {id}= req.params
    const sql= "delete from Staff where employeeId=?"

    db.query(sql,[id],(err)=>{
        if(err) return res.status(500).json({message:"failde to delete"});
        return res.status(200).json({message:"delete successfully"})
    })
})

export default staff;