const express = require('express')
const router = express.Router()
const s = require('../db/store')

// `GET /api/notes` should read the `db.json` file and return all saved notes as JSON
router.get('/notes', (req, res) => {
    console.log('you are trying to get notes')
    s.getNotes()
        .then(notes => {
            console.log(notes)
            res.json(notes)
        })
        .catch(err => res.status(500).json(err))
})

/* `POST /api/notes` should receive a new note to
 save on the request body, add it to the `db.json` file, 
 and then return the new note to the client. You'll need to find
  a way to give each note a unique id when it's saved 
  (look into `npm` packages that could do this for you).
*/
router.post('/notes', (req, res) => {
    console.log('you posted a note')
    s.addNote(req.body)
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err))
})

router.delete('/notes/:id', function (req, res) {
    s.removeNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json(err))
})

module.exports = router
