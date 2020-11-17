import React from 'react';
import './TitleBar.css';
import ReactComponent_Custom from '../CustomLibrary/ReactComponent_Custom.js';
import Client from '../ContentPane/Definitions/client';
import Inquiry from '../ContentPane/Definitions/Inquiry';


const CC = require( '../CustomLibrary/Object_Custom.js');

export class TitleBar extends ReactComponent_Custom {
    constructor(props){
        super(props);
        this.state = {
            rootName: 'TitleBar',
        
        }

        //function binds
        this.customBinds();
        this.processButton = this.processButton.bind(this);
        this.createClient = this.createClient.bind(this);
        this.createInquiry = this.createInquiry.bind(this);
        this.selectClient = this.selectClient(this);
        this.linkInquiry = this.linkInquiry.bind(this);

        this.buttonReqs = {
            'CreateClient': new CC.ButtonReq('CreateClient', 'Create Client', this.createClient),
            'CreateInquiry': new CC.ButtonReq('CreateInquiry', 'Create Inquiry', this.createInquiry),
        }
    }

    createClient(e){
        let newClient = new Client();
        this.dbInsertEntry('clients', newClient, this.selectClient);
    }

    selectClient(id){
        console.log('test')
        console.log(id)
    }

    createInquiry(e){
        if(this.props.selectedClient !== ''){
            let newInquiry = new Inquiry();
            this.dbInsertEntry('inquiries', newInquiry, this.linkInquiry)
        }
    }

    linkInquiry(id){
        if(this.props.selectedClient !== ''){
            //grab selected client Object
            const client = this.getClient();
            //grab any existing linked inquiries
            let newArray = (client.inquiries) ? client.inquiries : [];
            //push id to array
            newArray.push(id);
            //insert into db
            this.dbSetValue('clients', client.id, 'inquiries', newArray);
            //select the inquiry to auto display it
            this.stateHandler('selectedInquiry', id);
        }
    }

    processButton(e){
        console.log(e)
        //this.constants[e.target.attributes['callbackPointer']]();
    }


    getButtons(count){
        const rItems = [];
        let i = 0;
        for(const [key, ButtonReq] of Object.entries(this.buttonReqs)){
            const btn = this.ReactButton(ButtonReq, this.state.rootName, this.state.rootName + '-button-' + i);
            rItems.push(btn)
            i++;
        }

        return (
            <div className="App-header-menu">
                {rItems}
            </div>   
        );
    }


    render(){

        return (
            <div className="title-bar-header">
                <h1 className="title-bar-header-title">Quick Events</h1>
                {this.getButtons(this.menuBtnCount)}
            </div>
        );
    }
}