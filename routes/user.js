const express=require("express");
const routes=express.Router();
const UserService=require("../services/user");
const jwt=require("../services//JwtToken");
// const sessions = require('express-session');
// routes.use(sessions({
//     resave:true
// }));
routes.post("/login",(req,res)=>{
   let result=UserService.login(req.body.email,req.body.pwd);
   result.then((data)=>{
       console.log(data.length);
       let session=req.session;
       req.session.userlogin="true";
       console.log("session id="+req.sessionID);

       if(data=="true")
       {
          let token=  jwt.getNewToken({"email":req.body.email},process.env.JWT_SECRET_TOKEN);
            // console.log("token="+token);
           res.json({
            "status":"true",
            "code":"200",
            "token":token
           });
       
        //    res.session=session;
        //    req.session=session;
        //    console.log(session.login);     
       }
       else
       {
        res.json({
            "status":"false",
            "code":"404"
           });
       }

   },(error)=>{
    res.send(error);
   });
    // res.status(200).send(result); 
   // console.log(req.params.email+" "+req.params.pwd);
    // console.log(req.body);
    // res.status(200).send("hello emp");
});
routes.post("/register/",(req,res)=>{
    let result=UserService.register(req.body);
    result.then((data)=>{
        console.log(data.length);
        if(data.length>0)
        {
            res.send(data);
             
        }
        else
        {
         res.send("not found");
        }
    },(error)=>{
        res.send(error);
    });
});
routes.put("/update",(req,res)=>{
    let result=UserService.update(req.body);
    result.then((data)=>{
        console.log(data);
        if(data.affectedRows>0)
        {
            res.send(data);
             
        }
        else
        {
         res.send("not found");
        }
    },(error)=>{
        res.send(error);
    });
});
routes.get("/logincheck",(req,res)=>{
    let session=req.session;
    console.log("login check="+req.session.userlogin);
    console.log("session id="+req.sessionID);

    if(req.session.userlogin=="true")
    {
        res.json({
            "login":"true"
        });
    }
    else
    {
        res.json({
                "login":"false"
        });
    }
});
routes.post("/logout",(req,res)=>{
    req.session.destroy();
    res.json({
        "status":"success"
    });
});
module.exports=routes;