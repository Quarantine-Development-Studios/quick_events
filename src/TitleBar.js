import React from 'react';
import ReactDom from 'react-dom';


export class TitleBar extends React.Component {
    menuBtnCount = 5;

    ButtonTmp(text, id) { return(<button className="menu-button" key={id.toString()}>{text}</button>);}

    getButtons(count){
        const items = [];

        for(let i = 0; i < count; i++){
            items.push(this.ButtonTmp("test", i));
        }

        return (
            <div className="App-header-menu">
                {items}
            </div>   
        );
    }

    render(){

        return (
            <div className="App-header">
                <h1 className="App-header-title">Quick Events</h1>
                {this.getButtons(this.menuBtnCount)}
            </div>
        );
    }
}