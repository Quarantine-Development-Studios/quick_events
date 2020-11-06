import React from 'react';
import {TitleBar} from './TitleBar/TitleBar.js';
import {NavPane} from './NavPane/NavPane.js';
import {ContentPane} from './ContentPane/ContentPane.js';

export class Controller extends React.Component {
    constructor(){
        super();
        this.state = {

        }
    }





    render(){
        return (
            <div className="App">
                <TitleBar />
                <NavPane />
                <ContentPane />
            </div>
        )
    }
}