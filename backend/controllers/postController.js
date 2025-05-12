const db= require("../db/connect")


//get all post

exports.getAllPosts=(req,res)=>{
    const sql = "select * from Post";

    db.query(sql, (err,result)=>{
        if(err) return res.status(500).json({message:"failed to fetch"});

       res.status(200).json({message:"data", data:result})
    })
}

exports.createPost=(req,res)=>{
    const {post_title}= req.body

    const sql = "insert into Post (PostId, post_title) values(?,?)";
    db.query(sql,[post_title],(err)=>{
        if (err) return res.status(500).json({message:"failed to insert"});
        return res.status(200).json({message:"inserted successfully"})
    })
}

exports.deletePost= (req,res)=>{
    const {id}= req.params

    const sql = "delete from Post where PostId=?";

    db.query(sql,[id],(err)=>{
        if(err) return res.status(500).json({message:"failde to delete the psot"})
        return res.status(200).json({message:"post have been deleted "})    
    })
}

exports.updatePost =(req,res)=>{
  const {id}= req.params
  const {post_title}= req.body
  sql="update Post set post_title=? where PostId=?";
  db.query(sql,[id ,post_title],(err,result)=>{
    if(err) return res.status(500).json({message:"failed to update"})
    return res.status(200).json({message:"updated successfully"})    
  })
}