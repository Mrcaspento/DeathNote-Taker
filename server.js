const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

var PORT = process.env.PORT || 3000; 

const stickySock = path.join(__dirname, "/public/assets");
const wetSock = path.join(__dirname, "/Develop/db");
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/notes", function(req, res) {
    res.sendFile(path.join(stickySock, "notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(stickySock, "index.html"));
});


app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(wetSock, "db.json"));
});



app.get("/api/notes/:id", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync(wetSock,"db.json", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);
});



app.post("/api/notes", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync(wetSock,"db.json", "utf8"));
    let newNote = req.body;
    let uniqueID = (savedNotes.length).toString();
    newNote.id = uniqueID;
    savedNotes.push(newNote);

    fs.writeFileSync(wetSock,"db.json", JSON.stringify(savedNotes));
    console.log("Note saved to db.json. Content: ", newNote);
    res.json(savedNotes);
})

app.delete("/api/notes/:id", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync(wetSock,"db.json", "utf8"));
    let noteID = req.params.id;
    let newID = 0;
    console.log(`Deleting note with ID ${noteID}`);
    savedNotes = savedNotes.filter(currNote => {
        return currNote.id != noteID;
    })
    
    for (currNote of savedNotes) {
        currNote.id = newID.toString();
        newID++;
    }

    fs.writeFileSync(wetSock,"db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
})

  app.listen(PORT, function() {
    console.log("server listening " + PORT);
  });
  

