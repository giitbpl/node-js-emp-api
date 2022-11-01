// const { promise } = require("../DB/Connection");
const conn = require("../DB/Connection");
var url = require('url');
const { promise } = require("../DB/Connection");
const { resolve } = require("path");
const e = require("express");
const path = require("path");

class EmployeeService {
    async  getEmployeeByEid(eid) {
        let p = new Promise((resolve, reject) => {
            conn.query("select *from emp where eid=" + eid, (err, result) => {

                if (err)
                    reject(err);
                else
                    resolve(result[0]);
            });
        });
        return p;
    }
    getAllEmplouyee() {
        let p = new Promise((resolve, recject) => {
            conn.query("select *from emp", (err, result) => {
                if (err)
                    recject(err);
                else {
                    // for(let i =0;i<result.length;i++)
                    // {
                    //     result[i]["pic"]="data/"+result[i].eid;
                    // }
                    // console.log(result);
                    resolve(result);

                }
            });
        });
        return p;
    }
    saveEmployee(empdata) {
        let p = new Promise((resolve, reject) => {
            conn.query("insert into emp values(null,'" + empdata.name + "','" + empdata.dept + "'," + empdata.salary + ",'" + empdata.city + "','" + empdata.email + "')", (err, result) => {
                if (err) {
                    // console.log(err);
                    reject(err);
                }

                else
                    resolve(result);
            });
        });
        return p;
    }
    getEmployeePicById(eid, imageDirPath) {
        let p = new Promise((resolve, reject) => {

            this.getEmployeeByEid(eid, imageDirPath).then((data) => {
                // console.log(data);
                // resolve(data.pic);
                resolve(imageDirPath+ data.pic);
            }).catch((err) => {
                reject(err);
            });
        });
        return p;
    }
    deleteEmployeeByEid(eid)
    {
        let p=new Promise((resolve,reject)=>{
            this.getEmployeeByEid(eid).then((data)=>{
                console.log(data.length);
                if(data.eid==eid)
                {
                    conn.query("delete from emp where eid="+eid,(err,result)=>{
                        if(err) throw err;
                        else
                        {
                            var fs = require('fs');
                            var filePath = ''; 
                            fs.unlinkSync(path.resolve("./") + "/data/emp-img/" + data.pic);

                            resolve(result);
                        }
                    });
                }
                else
                {
                    console.log("not found");
                }
            }).catch((err)=>{
                    reject(err);
            });
        });
        return p;
    }
}
module.exports = new EmployeeService();