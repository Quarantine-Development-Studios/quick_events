import React from 'react';
import ReactComponent_Custom from '../ReactComponent_Custom.js';
import './ContentPane.css'
import firebase from '../firebase';
import Client from './Definitions/client';
import rxClients from '../rxClients';
import ClientImporter from './Windows/ClientImporter';
import InquiryWindow from './Windows/InquiryWindow.js';
import Inquiry from './Definitions/Inquiry.js';
import ClientInformation from './Windows/ClientInformation.js';
import NavPane from './Windows/NavPane/NavPane.js';

export class ContentPane extends ReactComponent_Custom {
    constructor(props){
        super(props);
        this.state = {

        }

        //function binds
        this.customBinds();
    }


    render(){
        let content = [];
        const testInquiry = new Inquiry();
        this.tryShowNavPane(content);
        this.tryShowClientPane(content, testInquiry);
        this.tryShowInquiryPane(content, testInquiry);

        this.tryShowClientImporter(content);

        return (
            <div className='content-pane'>
                {content}
            </div>
        )
    }

    tryShowClientImporter(content, testInquiry) {
        if (this.props.creatingClient) {
            content.push(
                //make sure windows that appear on top are assigned last
                <InquiryWindow
                    inquiry={testInquiry}
                    stateHandler={this.stateHandler} />
            );
        }
    }
    tryShowClientPane(content) {
        if (this.props.viewingClient) {
            content.push(
                //make sure windows that appear on top are assigned last
                <ClientImporter
                    creatingClient={this.props.creatingClient}
                    stateHandler={this.stateHandler} />
            );
        }
    }
    tryShowNavPane(content) {
        if (this.props.viewingNavigation) {
            content.push(
                <NavPane
                    stateHandler={this.stateHandler} />
            );
        }
    }

    tryShowInquiryPane(content, testInquiry) {
        if (this.props.viewingInquiry) {
            content.push(
                <InquiryWindow
                    inquiry={testInquiry}
                    stateHandler={this.stateHandler} />
            );
        }
    }
}