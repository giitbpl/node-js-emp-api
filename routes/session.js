const express=require("express");
const routes=express.Router();
routes.get("/",(req,res)=>{
    console.log(req.sessionID);
    let session=req.session;
    session.uname="tom";
    res.send("created");
});
routes.get("/check",(req,res)=>{
    console.log(req.sessionID);

    let session=req.session;
    res.send(session.uname);
});
module.exports=routes;