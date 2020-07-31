const fs = require('fs')
const util = require('util')
const { v4: uuidv4, v4 } = require('uuid')
// promise versions of async functions
const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)
const dbPath = 'db/db.json'

class Store {
    read = () => readFileAsync(dbPath, 'utf8')
    write = note => writeFileAsync(dbPath, JSON.stringify(note))

    getNotes = function () {
        let parsedNotes // array
        return this.read().then(notes => {
            try {
                parsedNotes = JSON.parse(notes)
            } catch (er) {
                parsedNotes = []
            }
            return parsedNotes
        })
    }

    addNote = function (note) {
        const { title, text } = note
        if (!title || !text) {
            throw new Error("note title and text can't be blank")
        }

        const newNote = {
            title: title,
            text: text,
            id: v4(),
        }
        return this.getNotes()
            .then(notes => [...notes, newNote]) //spread https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
            .then(updatedN => this.write(updatedN))
            .then(() => newNote)
    }

    removeNote = function (id) {
        return this.getNotes()
            .then(notes => notes.filter(note => note.id !== id))
            .then(filteredNotes => this.write(filteredNotes))
    }
}

module.exports = new Store()
