import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import "./Chat.css";

class Home extends Component {

    render () {
        
        return (
            <div>

<div class="chat">
        <div id="sidebar" class="chat__sidebar">

            <div className="head">makaan.com</div>

            <div className="room">
                Room Code 000
            </div>

            <div className="users">
                Users
                <div className="user">
                    owner 
                </div>
                <div className="user">
                    you
                </div>
            </div>

        </div>
        <div class="chat__main">
            <div id="messages" class="chat__messages">
                Demo chat App
            </div>

            <div class="compose">
                <form id="message-form">
                    <input name="message" placeholder="Message" required autocomplete="off" />
                    <button>Send</button>
                </form>
            
            </div>
        </div>
    </div>

    

    <script id="sidebar-template" type="text/html">
        <h2 class="room-title">room</h2>
        <h3 class="list-title">Users</h3>
        <ul class="users">

                <li>username</li>
   
        </ul>
    </script>
            </div>
            

            
        );
    }
}

export default Home;