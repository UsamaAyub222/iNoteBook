import React, { useState } from "react";

import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

    // All Notes
    const allNote = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5Zjk3OTRkYmVmMzFmYWQ0MTFhNzEyIn0sImlhdCI6MTY1NDY3NjU4Mn0.GapIOXwSLevIBlFwChnFJxvhAOmmtPb3SDxQDVpLPCE"
            }
        });
        const json = await response.json();
        console.log(json)
        setNotes(json)
    }

    // Add Note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5Zjk3OTRkYmVmMzFmYWQ0MTFhNzEyIn0sImlhdCI6MTY1NDY3NjU4Mn0.GapIOXwSLevIBlFwChnFJxvhAOmmtPb3SDxQDVpLPCE"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json)

        setNotes(notes.concat(json))
    }
    // Edit Note
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5Zjk3OTRkYmVmMzFmYWQ0MTFhNzEyIn0sImlhdCI6MTY1NDY3NjU4Mn0.GapIOXwSLevIBlFwChnFJxvhAOmmtPb3SDxQDVpLPCE"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }
    // Delete Note
    const deleteNote = async (id) => {
        console.log("Deleteing the id : " + id)
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5Zjk3OTRkYmVmMzFmYWQ0MTFhNzEyIn0sImlhdCI6MTY1NDY3NjU4Mn0.GapIOXwSLevIBlFwChnFJxvhAOmmtPb3SDxQDVpLPCE"
            },
            body: JSON.stringify()
        });
        const json = await response.json();
        console.log(json);
        const newState = notes.filter((note) => { return note._id !== id })
        setNotes(newState)
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, allNote }}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;