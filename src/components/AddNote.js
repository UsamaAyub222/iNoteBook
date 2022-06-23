import React, { useContext, useState } from 'react'
import contextValue from '../context/noteContext'

export default function AddNote() {
    
    
    const [note, setNote] = useState({title: "", description: "", tag: "Default"})

    const context = useContext(contextValue);
    const { addNote } = context;

    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag);
    }

    const onchange=(e)=>{
        setNote({...note, [e.target.name]: [e.target.value]})
    }

    return (
        <div>
            <div className='container my-3'>
                <h3>Add Note</h3>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={onchange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
                </form>
            </div>
        </div>
    )
}
