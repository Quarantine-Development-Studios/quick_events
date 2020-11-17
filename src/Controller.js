import React from 'react';
import ReactComponent_Custom from './CustomLibrary/ReactComponent_Custom.js';
import {TitleBar} from './TitleBar/TitleBar.js';
import {ContentPane} from './ContentPane/ContentPane.js';

export class Controller extends ReactComponent_Custom{
    constructor(props){
        super(props);
        this.state = {

        }

        //function binds
        this.customBinds();
    }



    render(){
        // console.log('Controller')
        // console.log(this.state)

        //reset creatingInquiry if no Client is selected

        return (
            <div className="App">
                <TitleBar 
                    stateHandler = {this.stateHandler}
                    
                />

                <ContentPane
                    stateHandler = {this.stateHandler}
                />
            </div>
        )
    }
}