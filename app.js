const express = require ("express");

const bodyPraser = require("body-parser");

var fs = require("fs");

const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'style.css')));

app.use (bodyPraser.urlencoded (
{
extended:true 
}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
     });

app.post("/adduser", function(req,res){
    var username = req.body.username;
    var dob = req.body.dob;
    var Profession = req.body.Profession;
    var obj = {};
    var key = req.body.userid;
    var newuser = {
        "Name": username,
        "dob": dob,
        "Profession": Profession
    }
    obj[key] = newuser;
    fs.readFile("user.JSON", "utf8", function(err,data){
        data = JSON.parse(data);
        data[key] = obj[key];
        console.log (data);
        var updateuser = JSON.stringify(data);
        fs.writeFile("user.JSON",updateuser, function(err){
        res.end (JSON.stringify(data));
        });
    });
});

app.post('/Particularusers', function(req,res){
    
    fs.readFile("user.JSON", "utf8", function(err,data){
    var user = JSON.parse(data);
    var users = user[req.body.usname];
    console.log (users);
    res.end(JSON.stringify (users));
});
});

app.post("/deleteuser", function(req,res){
    
    fs.readFile("user.JSON", "utf8", function(err,data){
        data = JSON.parse(data);
        delete data[req.body.uid];
        console.log(data);
        var updateuser = JSON.stringify(data);
        fs.writeFile("user.JSON", updateuser, function(err)
        {
           res.end(JSON.stringify(data));
        });
     });
});

app.get('/showalldetails', function(req,res){
    fs.readFile("user.JSON", "utf8", function(err,data)
    {
        console.log(data);
        res.end(data);
    });
  });

app.listen(8081,function(){
    console.log("server is running on part 8080");
});