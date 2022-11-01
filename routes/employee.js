const express = require("express");
const route = express.Router();
const empservice = require("../services/employee");
const path = require("path");
const e = require("express");
// const Jimp = require('jimp');
// var fs = require('fs');


require("dotenv").config();
route.post("/getpic", (req, res) => {
    let imagePath = req.protocol + "://" + req.hostname + ":" + process.env.PORT + "/emp/images/";
    // console.log(req.body);
    // console.log("login status 1="+res.locals.loginstatus);
    // console.log("login status 2="+req.loginstatus);
    if (req.loginstatus == "true") {
        

        empservice.getEmployeePicById(req.body.eid, imagePath).then((data) => {
            console.log("query result");
            // setTimeout(()=>{

                res.json({
                    "data": data,
                    "error": "false",
                    "count": data.length
    
                });
            // },1000);
            //base64 dimage data 
            // var imageAsBase64 = fs.readFileSync(path.resolve("./") + "/data/emp-img/" + data, 'base64');

            // res.json({
            //     "data": imageAsBase64,
            //     "error": "false",
            //     "count": imageAsBase64.length

            // });
        }).catch((err) => {
            console.log(err);

            res.json({
                "data": "",
                "error": err,
                "count": 0

            });
        });
    }
    else
    {
        res.json({
            "login":"false"
        });
    }
});

route.get("/searchbyeid/:eid",  (req, res) => {
    empservice.getEmployeeByEid(req.params.eid).then((data) => {
        res.json({
            "data": data,
            "error": "false",
            //"count": data.length
        });
    },(err) => {
        res.json({
            "data": "",
            "error": "true",
           // "count": 0
        });
    });
});
route.post("/newemp", (req, res) => {
    empservice.saveEmployee(req.body).then((data) => {
        res.json({
            "data": data,
            "error": "false",
            "count": data.length
        });
    }).catch((data) => {
        res.json({
            "data": "",
            "error": "true",
            "count": 0
        });
    });
});
route.get("/all", (req, res) => {
    empservice.getAllEmplouyee().then((data) => {
        res.json({
            "data": data,
            "error": "false",
            "count": data.length
        });

    }).catch((err) => {
        console.log("error=" + err);
        res.json({
            "data": "",
            "error": "true",
            "count": 0
        });
    });



    // res.json({
    //     "count"
    // });
});
route.delete("/del",(req,res)=>{
    console.log("delete ="+JSON.stringify( req.body));
    empservice.deleteEmployeeByEid(req.body.eid).then((result)=>{
        console.log(result);
        res.json({
            "error":"false",
            "data":result
        });
    }).catch((result)=>{
        res.json({
            "error":"true",
            "data":''
        });
        console.log(result);
    });
});
module.exports = route;