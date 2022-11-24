const {
    readAndAppend,
    writeToFile,
    readFromFile,
} = require("../helpers/fsUtils");
const db = require("../db/db.json");
const path = require("path");
const uuid = require("../helpers/uuid");
const router = require("express").Router();

router.get("/notes", (req, res) => {
    const dbPath = path.join(__dirname, "../db/db.json");
    readFromFile(dbPath)
        .then((data) => {
            return res.json(JSON.parse(data));
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.post("/notes", (req, res) => {
    const dbPath = path.join(__dirname, "../db/db.json");
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };
        readAndAppend(newNote, dbPath);
        const response = {
            status: "success",
            body: newNote,
        };
        res.json(response);
    } else {
        res.json("Error");
    }
});

router.delete("/notes/:id", (req, res) => {
    const dbPath = path.join(__dirname, "../db/db.json");
    const id = req.params.id;
    console.log(id)
    readFromFile(dbPath)


        .then((notes) => {
            var parseNotes = JSON.parse(notes)
            var notesArray = []
            var newNotes = parseNotes.filter((note) => {
                console.log(note)
                console.log(note)

                note.id !== id.toString();
                if (note.id !== id) {
                    notesArray.push(note)
                }
            });
            console.log(notesArray)
            writeToFile(dbPath, notesArray);
        })
        // .then((newNotes) => {
        //     writeToFile(dbPath, newNotes);
        // })
        .then(() => {
            res.json({ ok: true })
        })
    // read file loop if id matches button than delete
});

module.exports = router;
