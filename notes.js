import fs from 'fs';
import chalk from 'chalk';

export const getNotes = function () {
    return 'Your notes...';
}

export const addNote = function (title, body) {
    const notes = loadNotes();
    const duplicate = notes.filter(function (note) {
        return note.title === title;
    });
    
    if (duplicate.length === 0) {
        notes.push({
            title: title,
            body: body,
        });
    
        saveNotes(notes);
        console.log(chalk.bgGreenBright.bold('New note added!'));
    } else {
        console.log(chalk.bgRed.bold('Note title already exists!'));
    } 
}

export const removeNote = function (title) {
    const notes = loadNotes();
    const duplicate = notes.filter(function (note) {
        return note.title === title;
    });

    if (duplicate.length === 0) {
        console.log(chalk.bgRed.bold('No note found!'));
    } else {
        const newNote = notes.filter(function (note) {
            return note.title != title;
        })
        saveNotes(newNote);
        console.log(chalk.bgGreenBright.bold('Note removed!'));
    }
}

const saveNotes = function(notes) {
    fs.writeFileSync('notes.json',JSON.stringify(notes));
}

const loadNotes = function () {
    try {
        return JSON.parse(fs.readFileSync('notes.json'));
    } catch (e) {
        return [];
    }
}

