const {
    readAndAppend,
    writeToFile,
    readFromFile,
} = require("../helpers/fsUtils");
const db = require("../db/db.json");
const path = require("path");
const uuid = require("../helpers/uuid");
const router = require("express").Router();

// get route
// On a get request on /notes we create a dbpath const to store the db path
// then we use the readFromFile helper function to read the json file and return the json
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
// post route
// On a post request on /notes we create a dbpath const to store the db path
// We deconstruct the red.body to two const title and text
// We check if bothj title and text are not null and create a new note with an id using uuid
// then we use the readAndAppend helper function which takes in the newNote and dbPath
// lastly we send the response back or throw or error
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

// Delete route
// On a delete request on /notes/:id we create a dbpath const to store the db path
// We deconstruct the red.body to grab the id value
// then we use the readAndAppend helper function which takes in the newNote and dbPath
// then we use the readFromFile helper function which takes in the dbPath
// We then take the json from the json file and parse it using JSON.pase and store it into parseNotes
// Then we filter the parseNotes by exclude the id from the item delete and return it to a new array called notesArray
// then we use the writeToFile helper function which overwrites the json file without the object which had the delete id
// lastly we send the response back or throw or error
router.delete("/notes/:id", (req, res) => {
    const dbPath = path.join(__dirname, "../db/db.json");
    const id = req.params.id;
    readFromFile(dbPath)

        .then((notes) => {
            var parseNotes = JSON.parse(notes)
            const notesArray = parseNotes.filter((note) => note.id !== id);
            writeToFile(dbPath, notesArray);
        })
        .then(() => {
            res.json(`Item ${id} has been deleted 🗑️`)
        }).catch((err) => {
            res.status(500).json(err);
        })
});

module.exports = router;
