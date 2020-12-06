const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

let notes = [];
const stickySock = path.join(__dirname, "/public")
app.get("/", function(req, res) {
    res.sendFile(path.join(stickySock, "index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(stickySock, "notes.html"));
});
//anything not designated routed to index.html
app.get("*", function(req, res) {
    res.sendFile(path.join(stickySock, "index.html"));
});
//route for API of notes using database data
app.get("/api/notes", function(req, res) {
    notes = JSON.parse(fs.readFileSync("db/db.json"));
    res.json(notes);
});
//post to API notes
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

module.exports = notes;
app.listen(PORT, () => {
    console.log("Hacking the port" + PORT);
});

