import React from 'react';
import ReactComponent_Custom from '../ReactComponent_Custom.js';
import './NavPane.css';
import firebase from '../firebase';
import Client from '../client';
import rxClients from '../rxClients';
import ClientDirectory from './ClientDirectory/ClientDirectory';

export class NavPane extends ReactComponent_Custom {
    
    constructor(){
        super();
        this.state = {
            clients: [],
            selectedClient: "",
        }

        this.customBinds();

        this.removeClient = this.removeClient.bind(this);
        this.createClient = this.createClient.bind(this);

    }


    createClient(e){
        //let entry = firebase.firestore().collection('clients').doc();
        //entry.set(new Client("kevin", "blah@gmail.com", "1234567890").toJSON());
        this.stateHandler('creatingClient', true);

    }

    removeClient(e){
        
        if(this.state.selectedClient !== ""){
            this.setState({...this.state, selectClient: ""});
            let entry = firebase.firestore().collection('clients').doc(this.state.selectedClient); 
            entry.delete();
        }
    }


    componentDidMount(){
        rxClients.subscribe((clients) => this.setState({...this.state, clients: clients}));
    }


    render(){
        return (
            <div className="App-Window navpane">
                
                <div className="navpane-searchbar">
                    <input className="navpane-search-input"></input>
                    <button className="navpane-button">search</button>
                </div>

                <div className="navpane-searchbar">
                    <button className="navpane-button" onClick={this.createClient}>New Client</button>
                    <button className="navpane-button" onClick={this.removeClient}>Remove Client</button>
                </div>
                
                <ClientDirectory 
                    clients = {this.state.clients}
                    selectedClient = {this.state.selectedClient}
                    stateHandler = {this.stateHandler}
                />


            </div>
        )
    }
}