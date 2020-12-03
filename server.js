const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3001;
let notesData = [];
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Develop/public")));












app.delete("/api/notes/:id", function (req, res) {
    console.log(req.params.id);
    var deleteID = req.params.id;
    notes.splice(deleteID, 1);
    assignID();
    fs.writeFileSync("/Develop/db/db.json", JSON.stringify(notes), function (err) {
        if (err) 
            throw err
        });
    res.json({deletion:"success"})
});


function assignUniqueID() {
    for (i = 0; i < notes.length; i ++) {
        notes[i].id = i;
    }
}

//get request

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/assets/notes.html"));
  });
  
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/assets/index.html"));
  });
  
  app.get("/api/notes", function(req, res) {
    return res.sendFile(path.json(__dirname, "Develop/db/db.json"));
  });
  
  app.listen(PORT, function() {
    console.log("server listening " + PORT);
  });
  

