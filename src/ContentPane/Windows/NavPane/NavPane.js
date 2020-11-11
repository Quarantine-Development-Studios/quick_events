import React from 'react';
import ReactComponent_Custom from '../../../ReactComponent_Custom.js';
import './NavPane.css';
import firebase from '../../../firebase';
import rxClients from '../../../rxClients';
import ClientDirectory from '../../../Directories/ClientDirectory';

export default class NavPane extends ReactComponent_Custom {
    
    constructor(props){
        super(props);
        this.state = {

        }

        this.customBinds();

        this.removeClient = this.removeClient.bind(this);
        this.createClient = this.createClient.bind(this);

    }


    createClient(e){
        this.stateHandler('creatingClient', true);
    }

    removeClient(e){
        
        if(this.props.selectedClient !== ""){
            this.stateHandler('selectedClient', "");
            let entry = firebase.firestore().collection('clients').doc(this.props.selectedClient); 
            entry.delete();
        }
    }


    render(){   
        return (
            <div className="App-Window navpane">
                {this.WindowControlBar("Client Directory")}
                <div className="navpane-searchbar">
                    <div className="navpane-searchbar-line">
                        <input className="navpane-search-input"></input>
                        <button className="navpane-button">search</button>
                    </div>

                    <div className="navpane-searchbar-line">
                        {this.ReactButton('createClient', 'navpane', 'New Client', this.createClient)}
                        {this.ReactButton('removeClient', 'navpane', 'Remove Client', this.removeClient)}
                    </div>
                </div>

                <ClientDirectory 
                    clients = {this.props.clients}
                    selectedClient = {this.props.selectedClient}

                    inquiries = {this.props.inquiries}
                    selectedInquiry = {this.props.selectedInquiry}
                    relatedInquiries = {this.props.relatedInquiries}

                    stateHandler = {this.stateHandler}
                />

            </div>
        )
    }
}