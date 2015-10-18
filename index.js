#!/usr/bin/env node

var tmpEditor = require('tmp-editor')
var low = require('lowdb')
var userHome = require('user-home')
var mkdirp = require('mkdirp')

var quickNoteDir = userHome + '/.quicknote'

var addNote = function (notes, note) {
  notes.push(note)
}

var printNotes = function (notes) {
  notes.each(function (note, index) {
    console.log('  [' + (index + 1) + '] ' + note + '\n')
  })
}

var removeNote = function (notes, noteIndex) {
  if (!noteIndex) {
    return console.log('Please specify note index to remove')
  }

  notes.pullAt(noteIndex)
}

var main = function () {
  var db = low(quickNoteDir + '/db.json')
  var notes = db('notes')
  var flagOrNote = process.argv[2]

  // If flag or note is present, process normally.
  if (flagOrNote) {
    switch (flagOrNote) {
      case '-s':
      case '--show':
        console.log('All notes:')
        printNotes(notes)
        break
      case '-r':
      case '--remove':
        var noteIndex = process.argv[3] - 1
        removeNote(notes, noteIndex)
        break
      case '-e':
      case '--editor':
        tmpEditor().then(function (note) {
          addNote(notes, note)
        }).catch(console.error)
        break
      case '-h':
      case '--help':
        console.log('Usage:')
        console.log('  quicknote [note]                   Add new note [note]')
        console.log('  quicknote [stdin]                  Add new note from STDIN')
        console.log('  quicknote -s, --show               Show all notes')
        console.log('  quicknote -r, --remove [index]     Remove note at specified [index]')
        console.log('  quicknote -e, --editor             Edit and add new note with $EDITOR')
        console.log('  quicknote -h, --help               Display help')
        console.log('\nNote database can be found at ~/.quicknote/db.json')
        break
      default:
        addNote(notes, flagOrNote)
    }
  } else {
    // Else read from standard input.
    process.stdin.resume()
    process.stdin.setEncoding('utf8')
    process.stdin.on('data', function (note) {
      addNote(notes, note.trim())
    })
  }
}

mkdirp(quickNoteDir, function (error) {
  if (error) {
    console.error('quicknote directory error:', error)
  }

  main()
})
