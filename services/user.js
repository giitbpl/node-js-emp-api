// const { promise } = require("../DB/Connection");
const conn=require("../DB/Connection");
// const { use } = require("../routes/user");
// const session=require("express-session");

 class UserService
{
   
     login(email,password)
    {
        let p=new Promise((resolve,reject)=>{
            conn.query("select *from login where email='"+email+"' and pwd='"+password+"'",(err,result)=>{
                if(err) reject(err);
                else
                {
                //  console.log(result);   
                 if (result.length>0) 
                    {
                        resolve("true");

                    }
                    else
                    {
                        resolve("false");

                    }
                }
            });
               
        });
        return p;
    }
    register(user)
    {
        let p=new Promise((resolve,rejected)=>{
            conn.query("insert into login values(null,'"+user.name+"','"+user.email+"','"+user.pwd+"',null)",(err,result)=>{
                // console.log(result);
                if(err) rejected(err);
                else resolve(result);
            });
        });
        return p;

    }
    update(user)
    {
        let p=new Promise((resolve,reject)=>{
            conn.query("update login set name='"+user.name+"',email= '"+user.email+"' where id="+user.id,(err,result)=>{
                if(err) rejected(err);
                else resolve(result);
            });
        });
        return p;
    }
    loginCheck()
    {
        
    }
    checkUserByEmail(email)
    {
        let p=new Promise((resolve,reject)=>{
            conn.query("select *from login where email='"+email+"'", (err,result)=>{
                if(err) reject(err);
                else
                {
                //  console.log(result);   
                 if (result.length>0) 
                    {
                        resolve("true");

                    }
                    else
                    {
                        resolve("false");

                    }
                }
            });
               
        });
        return p;
    }
}

module.exports=new UserService();