const express = require("express");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();
const path = require('path');

// var FileStore = require('session-file-store')(session);

var cookieParser = require('cookie-parser');

const app = express();
const useractivity = require("./routes/user");
const empactivity = require("./routes/employee");
const sessionActivity = require("./routes/session");
const jwt = require("./services/JwtToken");
const userservice = require("./services/user");
app.use("/emp/images", express.static(path.join(__dirname, 'data/emp-img'))); //  "public" off of current is root

app.use(cookieParser());

app.use(cors({
    origin: ["http://localhost:4200"]
    // credentials:true
}));
const oneDay = 1000 * 60 * 60 * 24;

app.use(session({

    // It holds the secret key for session
    secret: 'demo',
    // genid: function(req) {
    //     return genuuid() // use UUIDs for session IDs
    //   },

    // Forces the session to be saved
    // back to the session store
    resave: false,

    // Forces a session that is "uninitialized"
    // to be saved to the store
    saveUninitialized: true,
    // cookie:{maxAge:oneDay},
    name: "ssid",

    // cookie:{ 
    //     // secure:false,
    //     maxAge:600000,
    //     // sameSite:"none",
    //     store:new FileStore

    // }
    // cookieName:"session"
    // store:store

}));

app.use(express.json());
app.use((req, res, next) => {
    console.log("auth=" + req.headers["authorization"]);
    if (req.headers["authorization"].length == 0) {
        console.log("auth not found");
        next();
    }
    else {
        let userdetail = jwt.verify(req.headers["authorization"], process.env.JWT_SECRET_TOKEN);
        // console.log(userdetail);
        // console.log(userservice.checkUserByEmail(userdetail.email));
        userservice.checkUserByEmail(userdetail.email).then((data) => {
            console.log("login checked=" + data);
            if (data == "true") {

                res.locals.loginstatus = "true";
                req.loginstatus="true";
            }
            else
            {

                res.locals.loginstatus = "false";
                req.loginstatus="false";
            }
            next();
            //  next();
        }).catch((err) => {


            // res.json({
            //     "error": "true",
            //     "login": "false"
            // });
            // next();
        });



    }


});
app.use("/user", useractivity);
app.use("/emp", empactivity);

app.listen(process.env.PORT, () => {
    console.log("running");
    // console.log(__dirname+"/data/emp-img");
    // console.log(path.join(__dirname, 'data/emp-img/'));
});
app.get("/", (req, res) => {
    // res.send(req.hostname+""+res.hostname);
    res.sendFile(path.resolve(__dirname, 'data/emp-img/1.png'));

});
