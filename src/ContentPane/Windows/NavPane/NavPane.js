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
            clients: [],
            selectedClient: "",
        }

        this.customBinds();

        this.removeClient = this.removeClient.bind(this);
        this.createClient = this.createClient.bind(this);

    }


    createClient(e){
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
                {this.WindowControlBar("Client Directory")}
                <div className="navpane-searchbar">
                    <div className="navpane-searchbar-line">
                        <input className="navpane-search-input"></input>
                        <button className="navpane-button">search</button>
                    </div>

                    <div className="navpane-searchbar-line">
                        <button className="navpane-button" onClick={this.createClient}>New Client</button>
                        <button className="navpane-button" onClick={this.removeClient}>Remove Client</button>
                    </div>
                </div>
                {
                <ClientDirectory 
                    clients = {this.state.clients}
                    selectedClient = {this.state.selectedClient}
                    stateHandler = {this.stateHandler}
                />
                }

            </div>
        )
    }
}