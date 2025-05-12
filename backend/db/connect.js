const mysql= require("mysql2");

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"st"
})

db.connect((err)=>{
    if(err){
        console.log("failed to connect to db",err)
        return
    }
    console.log("connected to database")
})

module.exports=db