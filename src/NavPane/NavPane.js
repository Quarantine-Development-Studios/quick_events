import React from 'react';
import './NavPane.css'
import firebase from '../firebase';
import Client from '../client';
import rxClients from '../rxClients';
import ClientDirectory from './ClientDirectory/ClientDirectory';

export class NavPane extends React.Component {
    
    constructor(){
        super();
        this.state = {
            clients: [],
            selectedClient: "",
        }

        this.removeClient = this.removeClient.bind(this);
        this.stateHandler = this.stateHandler.bind(this);

    }

    stateHandler(varName, value){
        console.log("trying to set stateHandler: " + varName + "  " + value)
        this.setState({
            [varName]: value
        })
    }


    createClient(e){
        let entry = firebase.firestore().collection('clients').doc();
        entry.set(new Client("kevin", "blah@gmail.com", "1234567890").toJSON());
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