const Express=require("express")
const Bodyparser=require("body-parser")
const Mongoose=require("mongoose")


var app=Express()
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())

app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"   ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"   ); 
    next(); });

var markModel=Mongoose.model("marks",
new Mongoose.Schema(
    {
       name:String,
       admno:String,
       cgpa:String 
    }
)

)

Mongoose.connect("mongodb+srv://adithya:adithya@cluster0.9dgmv.mongodb.net/markDb")

app.post("/api/delete",(req,res)=>{
    var getId=req.body
    markModel.findByIdAndRemove(getId,(error,data)=>{
        if(error)
        {
            res.send({"status":error})
        }
        else{
            res.send({"status":"success"})
        }
    })
})

app.post("/api/search",(req,res)=>{
    var getAdmno=req.body
    markModel.find(getAdmno,
    (error,data)=>{
        if(error)
        {
            res.send({"status":"error"})
        }
        else
        {
            res.send(data)
        }
    })
})



app.post("/api/markadd",(req,res)=>{
    var getName=req.body.name
    var getAdmno=req.body.admno
    var getCgpa=req.body.cgpa

    data={"name":getName,"admno":getAdmno,"cgpa":getCgpa}

    let mymark=new markModel(data)
    mymark.save((error,data)=>{
        if(error)
        {
            res.send({"status":"error","data":error})
        }
        else{
            res.send({"status":"success","data":data})
        }


    })
    

    

})
app.get("/api/view",(req,res)=>{
 markModel.find(
     (error,data)=>{
     if(error)
     {

        res.send({"status":"error"})
     }
     else{

        res.send(data)
     }

 })

})
app.listen(5000,()=>{

    console.log("server running")
})