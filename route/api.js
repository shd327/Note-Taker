const { readAndAppend, writeToFile, readFromFile } = require("../helpers/fsUtils");
const db = require("../db/db.json")
const path = require('path')
const uuid = require('../helpers/uuid')
const router = require('express').Router()

router.get('/notes', (req, res) => {
    const dbPath = path.join(__dirname, '../db/db.json')
    readFromFile(dbPath)
        .then((data) => {
            return res.json(JSON.parse(data))
        })
        .catch((err) => {
            res.status(500).json(err)
        })
});

router.post('/notes', (req, res) => {
    const dbPath = path.join(__dirname, '../db/db.json')
    const { title, text } = req.body
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid()
        }
        readAndAppend(newNote, dbPath)
        const response = {
            status: 'success',
            body: newNote
        }
        res.json(response)
    }
    else {
        res.json('Error')
    }
});

router.delete('/notes/:id', (req, res) => {
    const dbPath = path.join(__dirname, '../db/db.json')
    const { id } = req.body
    readFromFile(dbPath)
        .then((notes) => {
            notes.filter((note) => {
                note.id !== id

            })
                .then((newNotes) => {
                    writeToFile(dbPath, newNotes)
                })
        })
    // read file loop if id matches button than delete

});

module.exports = router