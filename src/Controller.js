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

            selectedClient: "",
            viewingClient: true,

            selectedInquiry: "",
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

                    selectedClient = {this.state.selectedClient}
                    viewingClient = {this.state.viewingClient}

                    selectedInquiry = {this.state.selectedInquiry}
                    viewingInquiry = {this.state.viewingInquiry}

                    selectedAgreement = {this.state.selectedAgreement}
                    viewingAgreement = {this.state.viewingAgreement}
                />
            </div>
        )
    }
}