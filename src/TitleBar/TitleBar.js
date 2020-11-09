import React from 'react';
import './TitleBar.css';
import ReactComponent_Custom from '../ReactComponent_Custom.js';

export class TitleBar extends ReactComponent_Custom {
    menuBtnCount = 5;

    
    getButtons(count){
        const items = [];

        for(let i = 0; i < count; i++){
            items.push(this.ReactButton(i, i));
        }

        return (
            <div className="App-header-menu">
                {items}
            </div>   
        );
    }


    render(){

        return (
            <div className="title-bar-header">
                <h1 className="title-bar-header-title">Quick Events</h1>
                {this.getButtons(this.menuBtnCount)}
            </div>
        );
    }
}