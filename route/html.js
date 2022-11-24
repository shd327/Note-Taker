const path = require('path')
const router = require('express').Router()

// Route / to /public/index.html
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});
// Route notes to /public/notes.html
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});
module.exports = router