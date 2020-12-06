const express = require("express");
const path = require("path");
const fs = require("fs");
const uui =require("uuid")

const app = express();

var PORT = process.env.PORT || 3000; 
//shortcut keys for routing


app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

let notes = [];
//routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/api/notes", function(req, res) {
    notes = JSON.parse(fs.readFileSync("db/db.json"));
    res.json(notes);
});



app.post("/api/notes", function(req, res) {
    let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuid.v4()
    }
    console.log(newNote);
    notes.push(newNote);
    fs.writeFileSync("db/db.json", JSON.stringify(notes));
    res.json(newNote);
})

app.delete("/api/notes/:id", function(req, res) {
    res.json(notes.filter(note => note.id !== parseInt(req.params.id)));
})
//listener for port
app.listen(PORT, () => {
    console.log("App listening at http://localhost:" + PORT);
});

module.exports = notes;
  
