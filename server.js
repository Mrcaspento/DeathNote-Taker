const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Develop/public")));



const writefileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
let sockNotes;


app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    readFileAsync(path.join(__dirname, "./Develop/db/db.json"), "utf8")
        .then(function (data) {
            sockNotes = JSON.parse(data);
            if (newNote.id || newNote.id === 0) {
                let currNote = sockNotes[newNote.id];
                currNote.title = newNote.title;
                currNote.text = newNote.text;
            } else {
                sockNotes.push(newNote);
            }
            writefileAsync(path.join(__dirname, "./Develop/db/db.json"), JSON.stringify(sockNotes))
                .then(function () {
                    console.log("socks");
                })
        });
    res.json(newNote);
});

app.delete("/api/notes/:id", function (req, res) {
    var id = req.params.id;
    readFileAsync(path.join(__dirname, "./db/db.json"), "utf8")
        .then(function (data) {
            sockNotes = JSON.parse(data);
            sockNotes.splice(id, 1);
            writefileAsync(path.join(__dirname, "./db/db.json"), JSON.stringify(sockNotes))
                .then(function () {
                    console.log("Deleted db.json");
                })
        });
    res.json(id);
});


function assignID() {
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
  
  app.get("/api/notes", function (req, res) {
    readFileAsync(path.join(__dirname, "/Develop/db/db.json"), "utf8")
        .then(function (data) {
            return res.json(JSON.parse(data));
        });
});

  app.listen(PORT, function() {
    console.log("server listening " + PORT);
  });
  

