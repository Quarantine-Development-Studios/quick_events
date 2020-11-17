import React from 'react';
import './TitleBar.css';
import ReactComponent_Custom from '../CustomLibrary/ReactComponent_Custom.js';


export default class TitleBar extends ReactComponent_Custom {
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
        const rootName = this.state.rootName;
        return (
            <div className= {rootName + "-header"}>
                <h1 className={rootName + "-header-title"}>Quick Events</h1>
            </div>
        );
    }
}