import React from 'react'
import { useState } from 'react';
import Player from './Player';

export default function Notes() {

    // Message State
    const [messages, setMessages] = useState([]);
    const username = "Username";
    const timestamp = "0:00:00";

    return (
        <div className="flex-container-column">
            <div className="label">
                Note Log
            </div>
            <div className="notes-section">
        
                {messages.map(item => <div> {username} {item} {timestamp} </div>)}

            </div>
            <form className="flex-container-row" style={{width:"100%"}} onSubmit={(e)=> {
                    setMessages([...messages, document.getElementById("note").value])
                    e.preventDefault()
                    document.getElementById("note").value=""
                }}>
                <input className="typing-area" type="text" id="note" placeholder='Enter Note Here' />
                <input type="submit" value="Enter" />
            </form>
            <div className="label"> 
                <label>
                    <input type="radio" value="Dynamic" name="log-type" /> Dynamic
                </label>
                <label>
                    <input type="radio" value="Static" name="log-type" /> Static
                </label>    
            </div>
        </div>
    )
}
