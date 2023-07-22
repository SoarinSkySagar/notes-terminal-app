import fs from 'fs';
import chalk from 'chalk';

const getNotes = () => {
    console.log(chalk.bgYellow.bold('Your notes...'));
}

export const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicate = notes.find((note) => {
        return note.title === title;
    });
    
    if (!duplicate) {
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
    if (notes.length === 0) {
        console.log(chalk.yellow('No notes created yet!'));
    } else {
        getNotes();
        notes.forEach((note) => {
            console.log( chalk.green(counter + '.'), note.title, chalk.green('\n=>'), note.body, '\n');
            counter++;
        });
    }
}

export const readNote = (title) => {
    const notes = loadNotes();
    const searched = notes.find((note) => {
        return note.title === title;
    });

    if (!searched) {
        console.log(chalk.bgRed.bold('No such note exists!'));
    } else {
        console.log(chalk.green('\n'+searched.title, '\n'+searched.body, '\n'));
    }
}

export const clearAll = () => {
    const notes = [];
    fs.writeFileSync('notes.json', JSON.stringify(notes));
    console.log(chalk.bgGreen.bold('All notes cleared!'));
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

