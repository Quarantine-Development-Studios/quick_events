import React from 'react';
import ReactComponent_Custom from './CustomLibrary/ReactComponent_Custom.js';
import {TitleBar} from './TitleBar/TitleBar.js';
import {ContentPane} from './ContentPane/ContentPane.js';
import rxClients from './rxClients';

export class Controller extends ReactComponent_Custom{
    constructor(props){
        super(props);
        this.state = {
            viewingNavigation: true,

            
            clients: [],
            creatingClient: false,
            selectedClient: "",
            viewingClient: true,

            creatingInquiry: false,
            selectedInquiry: "",
            viewingInquiry: true,
            
            viewingAgreement: false,
        }

        //function binds
        this.customBinds();
    }

    componentDidMount(){
        rxClients.subscribe((clients) => this.stateHandler('clients', clients));
    }

    afterRender(){
        const element = document.getElementById('CreateInquiry-button');
        if(element){
            element.disabled = (this.state.selectedClient === '') ? true : false;
        }
    }


    render(){
        // console.log('Controller')
        // console.log(this.state)

        //reset creatingInquiry if no Client is selected

        return (
            <div className="App">
                <TitleBar 
                    stateHandler = {this.stateHandler}

                    clients = {this.state.clients}
                    creatingClient = {this.state.creatingClient}
                    selectedClient = {this.state.selectedClient}


                    creatingInquiry = {this.state.creatingInquiry}
                    selectedInquiry = {this.state.selectedInquiry}

                />
                <ContentPane
                    stateHandler = {this.stateHandler}

                    viewingNavigation = {this.state.viewingNavigation}


                    clients = {this.state.clients}
                    creatingClient = {this.state.creatingClient}
                    selectedClient = {this.state.selectedClient}
                    viewingClient = {this.state.viewingClient}

                    selectedInquiry = {this.state.selectedInquiry}
                    viewingInquiry = {this.state.viewingInquiry}

                    selectedAgreement = {this.state.selectedAgreement}
                    viewingAgreement = {this.state.viewingAgreement}
                />
                {setTimeout(() => {
                    this.afterRender()
                }, 0)}
            </div>
        )
    }
}