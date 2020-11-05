import React from 'react';
import ReactDom from 'react-dom';
import './NavPane.css'


export class NavPane extends React.Component {
    render(){
        return (
            <div className="navpane">
                
                <div className="navpane-searchbar">
                    <input></input>
                    <button className="navpane-search-button">search</button>
                </div>

                <div className="navpane-content">

                </div>
            
            </div>
        )
    }
}