const {UesrModel,BookModel}=require("../modals");

// const getAllBooks =() =>{}
exports.getAllBooks=async(req,res)=>{
    const books=await BookModel.find();
    if(books.length===0){
        return res.status(404).json({
            success:false,
            message:"No Book Found"
        });
    }
res.status(200).json({
    success:true,
    data:books,
});
};


// router.get("/:id",(req,res)=>{
//     const {id}=req.params;
//     const book=books.find((each)=>each.id===id);

    // if(!book){
    //     return res.status(404).json({
    //         success:false,
    //         message:"Books Not Found"
    //     })
    // }
    // l
// });
exports.getSingleBooksId=async(req,res)=>{
    const {id}=req.params;
    const book= await BookModel.findById(id);
    if(!book){
        return res.status(404).json({
            success:false,
            message:"Books Not Found"
        });
    }
    return res.status(200).json({
        success:true,
        message:"Found The Book By Their id",
        data:book,
    });
};


// const usersWithTheIssuedBooks = user.filter((each)=>{
//         if(each.issuedBooks) return each;
//     });
//     const issuedBooks=[];

//     usersWithTheIssuedBooks.forEach((each)=>{
//         const book=books.find((book)=> book.id===each.issuedBook);

//         book.issuedBy=each.name;
//         book.issuedDate=each.issuedDate;
//         book.returnDate=each.returnDate;

//         issuedBooks.push(book);
//     });
//     if(issuedBooks.length===0){
//         return res.status(404).json({
//             success:false,
//             message:"No Book Have Been Issued Yet.."
//         });
//     }
//     return res.status(200).json({
//         success:true,
//         message:"Users Wait The Issued Books...",
//         data:issuedBooks,
//     });

// router.get("/issued/user",(req,res)=>{
//     
// });

exports.getAllIssuedBooks=async(req,res)=>{
        const users=await UesrModel.find({
            issuedBooks:{$exists:true}
        }).populate("issuedBook");
    
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
}