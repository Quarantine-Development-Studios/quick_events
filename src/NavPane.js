import React from 'react';
import ReactDom from 'react-dom';
import './NavPane.css'
import firebase from './firebase';
import Client from './client';
import rxClients from "./rxClients";

export class NavPane extends React.Component {
    //templates
    ClientLBL(id, name, dbID, className) { return (<label className={className} key={id.toString()} data-key={dbID} onClick={this.selectClient} onMouseOver={this.chgPointer} onMouseOut={this.chgNormal}>{name}</label>); }

    
    constructor(){
        super();
        this.state = {
            clients: [],
            selectedClient: "",
        }

        this.selectClient = this.selectClient.bind(this);
        this.removeClient = this.removeClient.bind(this);
        this.checkSelected = this.checkSelected.bind(this);
        this.chgPointer = this.chgPointer.bind(this);
        this.chgNormal = this.chgNormal.bind(this);

    }

    //display changes
    chgPointer(event){
        event.target.className = "client-label-pointer";
    }
    chgNormal(event){
        if(!this.checkSelected(event)){
            event.target.className = "client-label";
        }
    }
    


    createClient(e){
        let entry = firebase.firestore().collection('clients').doc();
        entry.set(new Client("kevin", "blah@gmail.com", "1234567890").toJSON());
    }

    selectClient(e){
        this.setState({...this.state, selectedClient: e.target.attributes['data-key'].value});
    }

    checkSelected(e){
        if(e.target.attributes['data-key'].value === this.state.selectedClient){
            return true;
        }
        return false;
    }

    removeClient(e){
        console.log("attempting to remove id: " + this.state.selectedClient + " from clients")
        let entry = firebase.firestore().collection('clients').doc(); 
        if(this.state.selectedClient !== ""){
            this.setState({...this.state, selectClient: ""});
            let entry = firebase.firestore().collection('clients').doc(this.state.selectedClient); 
            entry.delete();
        }
    }

    getClientAccessors(){
        const liveClients = this.state.clients;
        const rClients = [];
        //console.log("getting Clients")
        //console.log(liveClients);
        

        if(liveClients[0]){
            //console.log(liveClients);
            for(let i = 0; i < liveClients.length; i++){
                const key = i;
                const text = liveClients[i].name;
                const dbID = liveClients[i].id;


                
                //default className
                let className = "client-label"
                //if pointer
                if(dbID === this.state.selectedClient){ className = "client-label-pointer" }

                //create lbl
                rClients[i] = this.ClientLBL(key, text, dbID, className);

            }

            console.log(rClients)

            return (
                <div className="navpane-content">
                    {rClients}
                </div>
            ) 
        } else {
            return (<label></label>);
        } 
    }

    componentDidMount(){
        rxClients.subscribe((clients) => this.setState({...this.state, clients: clients}));
    }

    render(){
        return (
            <div className="navpane">
                
                <div className="navpane-searchbar">
                    <input className="navpane-search-input"></input>
                    <button className="navpane-button">search</button>
                </div>

                <div className="navpane-searchbar">
                    <button className="navpane-button" onClick={this.createClient}>New Client</button>
                    <button className="navpane-button" onClick={this.removeClient}>Remove Client</button>
                </div>

                {this.getClientAccessors()}
            
            </div>
        )
    }
}