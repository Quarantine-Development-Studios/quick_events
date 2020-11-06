import React from 'react';
import './ContentPane.css'
import firebase from '../firebase';
import Client from '../client';
import rxClients from '../rxClients';
import ClientImporter from './ClientImporter';



export class ContentPane extends React.Component {
    constructor(){
        super();
        this.state = {
            creatingClient: true,
        }

        //function binds
    }


    render(){
        let content;

        if(this.state.creatingClient){
            content = <ClientImporter 
                creatingClient = {this.state.creatingClient}
            />
        }

        return (
            <div className='App-Window content-pane'>
                {content}
            </div>
        )
    }

}