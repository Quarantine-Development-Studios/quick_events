import React from 'react';
import ReactComponent_Custom from './ReactComponent_Custom.js';
import {TitleBar} from './TitleBar/TitleBar.js';
import {NavPane} from './NavPane/NavPane.js';
import {ContentPane} from './ContentPane/ContentPane.js';

export class Controller extends ReactComponent_Custom{
    constructor(props){
        super(props);
        this.state = {
            creatingClient: true,
        }

        //function binds
        this.customBinds();
    }





    render(){
        return (
            <div className="App">
                <TitleBar />
                <NavPane 
                    stateHandler = {this.stateHandler}
                />
                <ContentPane
                    stateHandler = {this.stateHandler}
                    creatingClient = {this.state.creatingClient}
                />
            </div>
        )
    }
}