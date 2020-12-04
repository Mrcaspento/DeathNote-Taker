const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

var PORT = process.env.PORT || 3000; 
//shortcut keys for routing
const stickySock = path.join(__dirname, "./public/assets");
const wetSock = path.join(__dirname, "./Develop/db");

app.use(express.urlencoded({extended: true}));
app.use(express.json());


//basic route that sends teh user first to the AJAX page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(stickySock, "notes.html"))
});
app.get("*", function(req, res) {
    res.sendFile(path.join(stickySock, "index.html"));
});

//display notes  and store
app.get("/api/notes", function(req, res) {
    return res.json(activeNote)
});

app.get("/api/notes/:id", function(req, res) {
    let  = JSON.parse(fs.readFileSync(wetSock,"db.json", "utf8"));
    res.json([Number(req.params.id)]);
});
app.post("/api/notes", function(req, res){
    var newTable = req.body;
  console.log(newTable)
    if(tableList.length < 5){

      tableList.push(newTable)
    }else{
      waitList.push(newTable)
    }
    res.json(newTable);
})
//uniquie id script
var noteid = Math.random() // 0.9394456857981651
noteid.toString(36); 
var id = noteid.toString(36).substr(2, 9); 
id.length >= 9;



// app.post("app/clear", function(req,res){
//     tableData.splice(0);
//     waitlistData.lenght = 0;
//     res.json({ok: true});
// })
  app.listen(PORT, function() {
    console.log("server listening " + PORT);
  });
  

