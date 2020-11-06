import React from 'react';
import './ClientImporter.css'
import firebase from '../firebase';
import Client from '../client';
import rxClients from '../rxClients';
import ClientDirectory from '../NavPane/ClientDirectory/ClientDirectory';
import WindowCloseImg from '../images/WindowClose.png'

export default class ClientImporter extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }

        //bind functions

    }


    closeWindow(){
        console.log(this.props);
        //this.props.creatingClient = false;
    }

    render(){
        return (
            <div className="App-Border1 client-importer">
                <div className="control-Bar">
                    <div className="App-Window-Title">
                        <label >Client Importer</label>
                    </div>
                    <img className="App-Window-CloseBtn" onClick={this.closeWindow} alt="" src={WindowCloseImg} ></img>
                </div>
            </div>
        )
    }




}