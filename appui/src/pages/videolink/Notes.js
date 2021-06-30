import React from 'react'
import { useState } from 'react';
import Player from './Player';

export default function Notes({videoRef}) {

    console.log(videoRef)
    // Message State
    const [messages, setMessages] = useState([]);

    return (
        <div className="flex-container-column">
            <div className="label">
                Note Log
            </div>
            <div className="notes-section">
        
                {messages.map((item,index) => <div key={index}> {item.user} {item.message} {item.time} </div>)}

            </div>
            <form className="flex-container-row" style={{width:"100%"}} onSubmit={(e)=> {
                    setMessages([...messages, {
                        message:document.getElementById("note").value,
                        user:"username",
                        time: new Date(videoRef.current.getCurrentTime()*1000).toISOString().substr(11,8)}
                    ])
                    e.preventDefault()
                    document.getElementById("note").value=""
                }}>
                <input className="typing-area" type="text" id="note" autoComplete="off" placeholder='Enter Note Here' />
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
