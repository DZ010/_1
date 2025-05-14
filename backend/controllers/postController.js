import express from "express"
import db from "../db/connect.js"
const post = express.Router();

//get all post

post.get("/getAllPosts",async(req,res)=>{
    try{
    const sql = "select * from Post";
    const [result] = await db.query(sql)
    if(result.affectedRows==0){
        return res.status(400).json({message:"No psot inserted "})
    }
    return res.status(200).json({message:"all posts" ,data:result})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"error",err})
    }
});

post.post("/createPost",async(req,res)=>{
    try{
    const {post_title}= req.body
    const sql = "insert into Post (post_title) values(?)";
    await db.query(sql,[post_title])
    return res.status(200).json({message:"inserted successfully"})
   
    }
    catch(err){
        return res.status(500).json({message:"failde to insert"})
    }
})

post.delete("/deletePost/:id", async(req,res)=>{
    try{
    const {id}= req.params
    const sql = "delete from Post where PostId=?";
    await db.query(sql,[id])
    return res.status(200).json({message:"deleted successfully"})

    }
    catch(err){
        return res.status(500).json({message:"server error "})
    }
})

post.put("/updatePost/:id" ,async(req,res)=>{
  try{
  const {id}= req.params
  const {post_title}= req.body
  const sql="update Post set post_title=? where PostId=?";
  const [result] = await db.query(sql,[post_title,id])
  if (result.affectedRows==0){
    return res.status(400).json({message:"the post not found"})
  }
  return res.status(200).json({message:"updated ",data:result})
  
  }
  catch(err){
    return res.status(500).json({message:"server error"})
  }
})

export default post;