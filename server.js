const express = require("express");
const path = require("path");
const fs = require("fs");
const Store = require('./db/store')

const app = express();

var PORT = process.env.PORT || 3000; 
//shortcut keys for routing
const stickySock = path.join(__dirname, "./public");
const wetSock = path.join(__dirname, "./Develop/db");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const saveNotes = [];
//basic route that sends teh user first to the AJAX page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(stickySock, "/notes.html"))
});
app.get("/", function(req, res) {
    res.sendFile(path.join(stickySock, "/index.html"));
});





// we goin to use the classy boi Store to do the db manipulation
//display notes  and store
app.get("/api/notes", function(req, res) {
    Store.getNotes().then(function(notes) {
      // send that sweet data in json format back to the front end guys who made this ajax call
      res.json(notes)
    }).catch(function(err){
      // watching for errors bc we paranoid.... THEY'RE IN THE TREES!!lo!l
      res.status(500).json(err)
    })
});

app.get("/api/notes/:id", function(req, res) {
    let  = JSON.parse(fs.readFileSync(wetSock,"/db.json", "utf8"));
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



app.post("app/clear", function(req,res){
    tableData.splice(0);
    waitlistData.length = 0;
    res.json({ok: true});
})
  app.listen(PORT, function() {
    console.log("server listening " + PORT);
  });
  

