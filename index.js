const express=require("express");

const app = express();

const PORT=8081;

app.use(express.json());
app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Server is up and runing :-)",
    })
})
app.listen(PORT,()=>{
    console.log(`Server is runing at port ${PORT}`);
});