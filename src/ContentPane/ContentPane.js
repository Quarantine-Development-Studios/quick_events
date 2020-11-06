import React from 'react';
import ReactComponent_Custom from '../ReactComponent_Custom.js';
import './ContentPane.css'
import firebase from '../firebase';
import Client from '../client';
import rxClients from '../rxClients';
import ClientImporter from './ClientImporter';



export class ContentPane extends ReactComponent_Custom {
    constructor(props){
        super(props);
        this.state = {

        }

        //function binds
        this.customBinds();
    }


    render(){
        let content;
        console.log(this.props)
        if(this.props.creatingClient){
            content = 
            
            //make sure windows that appear on top are assigned last
            <ClientImporter 
                creatingClient = {this.props.creatingClient}
                stateHandler = {this.stateHandler}
            />;
        }

        return (
            <div className='App-Window content-pane'>
                
                {content}
            </div>
        )
    }

}