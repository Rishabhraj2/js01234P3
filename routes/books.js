const express=require("express");
const {books}=require("../data/books.json");
const {user}=require("../data/users.json");
const router=express.Router();


/**
   * Route:/books
   * Method:GET
   * Description:Geting all books
   * Access:public
   * Parameter:None
   */

router.get("/",(_req,res)=>{
    res.status(200)
    .json({sucess:true,message:"Got all the Books",data:books});
});


/**
   * Route:/books
   * Method:GET
   * Description:Geting books By Their Id
   * Access:public
   * Parameter:None
   */

router.get("/:id",(req,res)=>{
    const {id}=req.params;
    const book=books.find((each)=>each.id===id)

    if(!book){
        return res.status(404).json({
            success:false,
            message:"Books Not Found"
        })
    }
    return res.status(200).json({
        success:true,
        message:"Found The Book By Their id",
        data:books,
    });
});

/**
   * Route:/books
   * Method:GET
   * Description:Geting all Issue books
   * Access:public
   * Parameter:None
   */

router.get("/issued/by-user",(req,res)=>{
    const usersWithTheIssuedBooks = users.filter((each)=>{
        if(each.issuedBooks) return each;
    });
    const issuedBooks=[];

    usersWithTheIssuedBooks.forEach((each)=>{
        const book=books.find((book)=>(book.id===each.issuesBooks));

        book.issuedBy=each.name;
        book.issuedDate=each.issuedDate;
        book.returnDate=each.returnDate;

        issuedBooks.push(book);
    });
    if(issuedBooks.length===0){
        return res.status(404).json({
            success:false,
            message:"No Book Have Been Issued Yet.."
        });
    }
    return res.status(200).json({
        success:true,
        message:"Users Wait The Issued Books...",
        data:issuedBooks,
    });
});
module.exports=router;