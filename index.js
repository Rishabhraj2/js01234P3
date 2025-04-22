const express=require("express");
const dotenv= require("dotenv");
const DbConnection=require("./databaseConnection")
// const {users}=require("./data/users.json");;
// const {books} =require("./data/books.json");

const userRouter=require("./routes/users.js")
const booksRouter=require("./routes/books");

dotenv.config();
const app = express();
DbConnection();

const PORT=8081;

app.use(express.json());

http://localhost:8081/users
app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Server is up and runing :-)",
        data:"hey",
    });
});

app.use("/users",userRouter);
app.use("/books",booksRouter);

// app.get("*",(req,res)=>{
//     res.status(404).json({
//         message: "this route does not exits",
//     });
// });

app.listen(PORT,()=>{
    console.log(`Server is runing at port ${PORT}`);
});