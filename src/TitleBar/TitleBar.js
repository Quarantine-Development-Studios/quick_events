import React from 'react';
import './TitleBar.css';
import ReactComponent_Custom from '../CustomLibrary/ReactComponent_Custom.js';

import Client from '../ContentPane/Definitions/client';
import Inquiry from '../ContentPane/Definitions/Inquiry';


export class TitleBar extends ReactComponent_Custom {
    constructor(props){
        super(props);
        this.state = {
            rootName: 'TitleBar',
        
        }

        //function binds
        this.customBinds();
        this.processButton = this.processButton.bind(this);
    }




    processButton(e){
        console.log(e)
        //this.constants[e.target.attributes['callbackPointer']]();
    }




    render(){

        return (
            <div className="title-bar-header">
                <h1 className="title-bar-header-title">Quick Events</h1>
            </div>
        );
    }
}