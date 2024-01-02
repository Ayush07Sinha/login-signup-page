const express=require("express");
const mysql=require("mysql2")
const cors=require("cors")

const app=express();
app.use(cors());
app.use(express.json());

###Connecting to a databse
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"credentials"
})

###Record creation in the signup table when user enter its credentials
app.post('/credentials',(req,res)=>{
    const sql="INSERT INTO signup(`name`,`email`,`password`) VALUES(?)";
    const values=[
        req.body.name,
        req.body.email,
        req.body.password
    ]
    
    db.query(sql,[values],(err,data)=>{
        if(err){
            return res.json("Error")
        }
        return res.json(data);
    })
})

###Retrieving the list of records fro the signup table
app.post('/signup',(req,res)=>{
    const sql="SELECT * FROM signup WHERE `email`=? AND `password`=?";
    
    db.query(sql,[req.body.email,req.body.password],(err,data)=>{
        if(err){
            return res.json("Error")
        }
        if (data.length>0) {
            return res.json('success')    
        }else{
            return res.json('fail');
        }
    })
})

app.listen(8081,()=>{
    console.log("listening")
})
