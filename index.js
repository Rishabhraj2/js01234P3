const express=require("express");
const {users}=require("./data/users.json");

const app = express();

const PORT=8081;

app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Server is up and runing :-)",
        data:"hey",
    });
});

/**
 * Route:/users
 * Method:GET
 * Description:Get all users
 * Access:public
 * Parameter:None
 */

app.get("/users",(req,res)=>{
  res.status(202).json({
    success:true,
    data:users,
  });  
});

// app.get("*",(req,res)=>{
//     res.status(404).json({
//         message: "this route does not exits",
//     });
// });

app.listen(PORT,()=>{
    console.log(`Server is runing at port ${PORT}`);
});