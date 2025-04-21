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
        data:book,
    });
});

/**
   * Route:/books
   * Method:GET
   * Description:Geting all Issue books
   * Access:public
   * Parameter:None
   */

router.get("/issued/user",(req,res)=>{
    const usersWithTheIssuedBooks = user.filter((each)=>{
        if(each.issuedBooks) return each;
    });
    const issuedBooks=[];

    usersWithTheIssuedBooks.forEach((each)=>{
        const book=books.find((book)=> book.id===each.issuedBook);

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

/**
   * Route:/
   * Method:POST
   * Description:Add New books
   * Access:public
   * Parameter:None
   * Data:author,price,id,publisher,name
   */

router.post("/",(req,res)=>{
    const { data }=req.body;
    if(!data){
        return res.status(400).json({
            success:false,
            message:"No Data To Add A Book",
        });
    }
    const book=books.find((each)=>each.id===data.id);
    if(book){
        return res.status(400).json({
            success:false,
            message:"Id Already Exists !!"
        });
    }
    const allBooks={...books,data};
    return res.status(201).json({
        success:true,
        message:"Added Book Succesfully",
        data:allBooks
    })
});

/**
   * Route:/:ID
   * Method:PUT
   * Description:Updating book By ITS ID
   * Access:public
   * Parameter:ID
   * DATA: ID , NAME,GENDER,PRICE,PUBLISHER,AUTHOR
   */
router.put("/updateBook/:id",(req,res)=>{
    const{id}=req.params;
    const{data}=req.body;
  
    const book=books.find((each)=>each.id===id);
    if(!book){
      return res.status(404).json({
        success:false,
        message:"Book not found for this id !!",
      });
    }
    const updateData=books.map((each)=>
        {
      if(each.id===id){
        return{
          ...each,
          ...data };
      }
      return each;
    });
    return res.status(200).json({
      success:true,
      message:"book Updated !!",
      data:updateData , 
    });
  });

module.exports=router;