const express=require("express");
const {users}=require("./data/users.json");
// const {books} =require("./data/books.json");

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

// http://localhost:8081/user/id
app.get("/users",(req,res)=>{
  res.status(202).json({
    success:true,
    data: users,
  });  
});

//http://localhost:8081/user/4
/**
 * Route:/users/id
 * Method:GET
 * Description:Get single user y their id
 * Access:public
 * Parameter:None
 */

app.get('/users/:id',(req,res)=>{
  const{id}=req.params;
  // params= it means find particular id 
  console.log(req.params);
  const user=users.find((each)=>each.id===id); //each is optional name like(elenment or each)
  if(!user){
    return res.status(404).json({
      success:false,
      message:"User Doesn't Exist !!",
    });
  } else{
  return res.status(200).json({
    success:true,
    message:"User Found",
    data:user,
  });
}
});

/**
 * Route:/users/id
 * Method:GET
 * Description:Creating a new user
 * Access:public
 * Parameter:None
 */

app.post("/users",(req,res)=>{
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

app.put("/user/:id",(req,res)=>{
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

app.delete("/users/:id",(req,res)=>{
  const{id}=req.params;
  const user=users.find((each)=>each.id===id);
  if(!user){
    return res.status(404).json({
      success:false,
      message:"User Doesn't Exist !!",
    });
  }
  // need to build logic for delete here...
})
// app.get("*",(req,res)=>{
//     res.status(404).json({
//         message: "this route does not exits",
//     });
// });

app.listen(PORT,()=>{
    console.log(`Server is runing at port ${PORT}`);
});