const express=require("express");
const {users}=require("../data/users.json");
// const {users}=require("../index");
const router=express.Router();

/**
 * Route:/users
 * Method:GET
 * Description:Get all users
 * Access:public
 * Parameter:None
 */

// http://localhost:8081/user/users
router.get("/", (req,res)=>{
    res.status(200).json({
      success:true,
      data: users,
    });  
  });
  
  //http://localhost:8081/user/4
  /**
   * Route:/id
   * Method:GET
   * Description:Get single user y their id
   * Access:public
   * Parameter:None
   */
  
  router.get("/:id",(req,res)=>{
    const{id}=req.params;
    // params= it means find particular id 
    console.log(req.params);
    const user=users.find((each)=>each.id===id); //each is optional name like(elenment or each)
    if(!user){
      return res.status(404).json({
        success:false,
        message:"User Doesn't Exist !!",
      });
    }
    return res.status(200).json({
      success:true,
      message:"User Found",
      data:user,
    });
  
  });
  
  /**
   * Route:/users/id
   * Method:GET
   * Description:Creating a new user
   * Access:public
   * Parameter:None
   */
  
  router.post("/users",(req,res)=>{
  const {id,name,surname,email,subscriptionType,subscriptionDate}=req.body
  const user=users.find((each)=>each.id===id);
  if(user){
    return res.status(404).json({
      success:false,
      message:"User With The ID Exists",
    });
  }
  users.push({
    id,
    name,
    surname,
    email,
    subscriptiontype,
    subscriptionDate,
  });
  
  return res.status(201).json({
  success:true,
  message:"User Added Succesfully",
  data:users,
  });
  });
  
  /**
   * Route:/users/:id
   * Method:put
   * Description:Updating a user by their id
   * Access:public
   * Parameter:None
   */
  
  router.put("/user/:id",(req,res)=>{
    const{id}=req.params;
    const{data}=req.body;
  
    const user=users.find((each)=>each.id===id);
    if(!user){
      return res.status(404).json({
        success:false,
        message:"User Doesn't Exist !!",
      });
    }
    const updateUserData=users.map((each)=>{
      if(each.id===id){
        return{
          ...each,
          ...data,
        };
      }
      return each;
    });
    return res.status(200).json({
      success:true,
      message:"user Updated !!",
      data:updateUserData , 
    });
  });
  
  
  /**
   * Route:/users/:id
   * Method:put
   * Description:Updating a user by their id
   * Access:public
   * Parameter:None
   */
  
  router.delete("/users/:id",(req,res)=>{
    const{id}=req.params;
    const user=users.find((each)=>each.id===id);
    if(!user){
      return res.status(404).json({
        success:false,
        message:"User Doesn't Exist !!",
      });
    }
    const index=users.indexOf(user);
    users.splice(index,1)
  
    return res.status(200).json({success: true,message:"Deleted User..",data:users,data:users});
  });


module.exports=router;