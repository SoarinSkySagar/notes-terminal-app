import fs from 'fs';
import chalk from 'chalk';

export const getNotes = () => {
    console.log(chalk.bgYellow.bold('Your notes...'));
}

export const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicate = notes.filter((note) => {
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

export const removeNote = (title) => {
    const notes = loadNotes();
    const duplicate = notes.filter((note) => {
        return note.title === title;
    });

    if (duplicate.length === 0) {
        console.log(chalk.bgRed.bold('No note found!'));
    } else {
        const newNote = notes.filter((note) => {
            return note.title != title;
        })
        saveNotes(newNote);
        console.log(chalk.bgGreenBright.bold('Note removed!'));
    }
}

export const listNotes = () => {
    const notes = loadNotes();
    var counter = 1;
    notes.forEach((note) => {
        console.log( chalk.green(counter + '.'), note.title, chalk.green('\n=>'), note.body, '\n');
        counter++;
    });
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json',JSON.stringify(notes));
}

const loadNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes.json'));
    } catch (e) {
        return [];
    }
}

