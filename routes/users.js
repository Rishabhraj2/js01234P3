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
  
  router.put("/:id",(req,res)=>{
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
          ...data
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


  /**
   * Route:/usersSUBSCRIPTION-DETAILS/:id
   * Method:put
   * Description:
   * Get all usrt Subscroption Detail
   * Access:public
   * Parameter:ID
   */

  router.get("/subscription-details/:id",(req,res)=>{
    const{id}=req.params;
    const user=users.find((each)=>each.id===id);
    if(!user){
      return res.status(404).json({
        success:false,
        message:"user with the id didnt exist",
      });
    }

    const getDateInDays=(data="")=>{
      let date;
      if(data===""){
        date=new Date();
      }else{date=new Date(date);
      }
      let days=Math.floor(date/(1000*60*60*24));
      return days;
    };

    const subscriptionType=(date)=>{
      if((user.subscriptionType==="Basic")){
        date=date+90;
      }
      else if ((user.subscriptionType==="standard")){
        date=date+180;
      }
    else if((user.subscriptionType==="Premium")){
      date=date+365;
    }
    return date;
    };
    let returnDate=getDateInDays(user.returnDate);
    let currentDate=getDateInDays();
    let subscriptionDate=getDateInDays(user.subscriptionDate);
    let subscriptionExpiration=subscriptionType(subscriptionDate);

    // console.log("returnDate",returnDate);
    // console.log("currentDate",currentDate);
    // console.log("subscriptionDate",subscriptionDate);
    // console.log("subscriptionExpiration",subscriptionExpiration);
    const data={
      ...user,
      isSubscriptionExpired:subscriptionExpiration<=currentDate,
      daysLeftForExpiration:
      subscriptionExpiration<=currentDate
      ? 0
      : subscriptionExpiration-currentDate,
      fine:
      returnDate<currentDate
      ? subscriptionExpiration<=currentDate
      ? 100
      :50
      :0,
    };
    return res.status(200).json({
      success:true,
      message:"subscription detail for the user is :",
    });
  });
module.exports=router;