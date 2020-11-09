import React from 'react';
import ReactComponent_Custom from './ReactComponent_Custom.js';
import {TitleBar} from './TitleBar/TitleBar.js';
import {ContentPane} from './ContentPane/ContentPane.js';

export class Controller extends ReactComponent_Custom{
    constructor(props){
        super(props);
        this.state = {
            creatingClient: false,
            viewingNavigation: true,
            viewingClient: true,
            viewingInquiry: true,
            viewingAgreement: false,
        }

        //function binds
        this.customBinds();
    }





    render(){
        return (
            <div className="App">
                <TitleBar />
                <ContentPane
                    stateHandler = {this.stateHandler}
                    creatingClient = {this.state.creatingClient}
                    viewingNavigation = {this.state.viewingNavigation}
                    viewingClient = {this.state.viewingClient}
                    viewingInquiry = {this.state.viewingInquiry}
                    viewingAgreement = {this.state.viewingAgreement}
                />
            </div>
        )
    }
}