import { getNotes, addNote, removeNote, listNotes } from "./notes.js";
import chalk from 'chalk';
import yargs from "yargs";
import { hideBin } from 'yargs/helpers'

const yarg = yargs(hideBin(process.argv));

yarg.command({
    command: 'add',
    describe:'Add a new note to the database.',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv) {
        addNote(argv.title, argv.body);
    },
    
})

yarg.command({
    command: 'remove',
    describe: 'Remove a note from the database',
    builder: {
        title: {
            describe: "Remove a note",
            demandOption: true,
            type:'string',
        }
    },
    handler(argv) {
        removeNote(argv.title);
    }
})

yarg.command({
    command: 'list',
    describe: 'List all the notes in the database',
    handler() {
        getNotes();
        listNotes();
    },
    
})

yarg.command({
    command: 'read',
    describe: 'List all the notes in the database',
    handler() {
        console.log('Reading the lists in the database')
    }
})

yarg.parse();