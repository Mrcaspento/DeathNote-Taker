const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid =require("uuid")

const app = express();
const stickySock = path.join(__dirname, "/public")
var PORT = process.env.PORT || 3000; 
//shortcut keys for routing


app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

let notes = [];
//routes

app.get("/notes", function(req, res) {
  res.sendFile(path.join(stickySock, "notes.html"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(stickySock, "index.html"));
});

app.get("/api/notes", function(req, res) {
  notes = JSON.parse(fs.readFileSync("../db/db.json"));
  res.json(notes);
});
app.get("/api/notes/:id", function(req, res) {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(savedNotes[Number(req.params.id)]);
});

app.post("/api/notes", function(req, res) {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let newNote = req.body;
  let uniqueID = (savedNotes.length).toString();
  newNote.id = uniqueID;
  savedNotes.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
  res.json(savedNotes);
})

app.delete("/api/notes/:id", function(req, res) {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let noteID = req.params.id;
  let newID = 0;
  savedNotes = savedNotes.filter(currNote => {
      return currNote.id != noteID;
  })
  for (currNote of savedNotes) {
      currNote.id = newID.toString();
      newID++;
  }
  fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
  res.json(savedNotes);
})

app.listen(PORT, function() {
  console.log("server listening at " + PORT);
});
