import mysql from "mysql2/promise"
const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"st",
    waitForConnections:true,
})

db.getConnection()
.then(()=>{
    console.log("connected successfully")
})
.catch((err)=>{
    console.log("failde to ceonnect")
})

export default db