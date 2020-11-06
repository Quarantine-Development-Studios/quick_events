import React from 'react';
import ReactComponent_Custom from '../ReactComponent_Custom.js';
import './ClientImporter.css';
import WindowCloseImg from '../images/WindowClose.png';
import Client from './client.js';
import firebase from '../firebase';

export default class ClientImporter extends ReactComponent_Custom {
    constructor(props){
        super(props);
        this.state = {

        }

        //bind functions
        this.customBinds();
        this.closeWindow = this.closeWindow.bind(this);
        this.submitImport = this.submitImport.bind(this);
    }

    //templates
    clientImporterField(valueID) { return (
        <div className="client-importer-field">
            <label className="client-importer-field-label" >{valueID}: </label>
            <input className="client-importer-field-input" id={"clientImporter-" + valueID}></input>
        </div>
    )};

    closeWindow(e){
        console.log("ClientImporter_CloseWindow");
        this.stateHandler('creatingClient', false);
    };

    submitImport(e){
        const FirstName = document.getElementById("clientImporter-First Name").value;
        const LastName = document.getElementById("clientImporter-Last Name").value;
        if(FirstName !== "" && LastName !== ""){
            const FullName = FirstName + " " + LastName;
            const Email = document.getElementById("clientImporter-Email").value;
            const Phone = document.getElementById("clientImporter-Phone").value;

            const ClientOut = new Client(FullName,Email,Phone);
            
            
            let entry = firebase.firestore().collection('clients').doc();
            entry.set(ClientOut.toJSON());

            //clean up content space and close window
            this.closeWindow(e);
        } else {
            alert("need both first and last name!");
        }

    };

    render(){
        console.log("ClientImporter")
        console.log(this.props);
        return (
            <div className="App-Border1 client-importer">
                <div className="control-Bar">
                    <div className="App-Window-Title">
                        <label >Client Importer</label>
                    </div>
                    <img className="App-Window-CloseBtn" onClick={this.closeWindow} alt="" src={WindowCloseImg} ></img>
                </div>

                <div className="client-importer-body">
                    {this.clientImporterField('First Name')}
                    {this.clientImporterField('Last Name')}
                    {this.clientImporterField('Email')}
                    {this.clientImporterField('Phone')}
                    
                </div>
                <div>
                    <button className="client-importer-submit" onClick={this.submitImport} >Submit</button>
                </div>
            </div>
        )
    }




}