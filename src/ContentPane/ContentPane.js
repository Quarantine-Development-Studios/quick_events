import React from 'react';
import ReactComponent_Custom from '../ReactComponent_Custom.js';
import './ContentPane.css'
import rxClients from '../rxClients';
import ClientImporter from './Windows/ClientImporter';
import Inquiry from './Definitions/Inquiry.js';
import NavPane from './Windows/NavPane/NavPane.js';
import ClientPane from './Windows/ClientPane.js';
import rxInquiries from '../rxInquiries.js';

export class ContentPane extends ReactComponent_Custom {
    constructor(props){
        super(props);
        this.state = {
            clients: [],
            inquiries: [],
        }

        //function binds
        this.customBinds();
    }

    componentDidMount(){
        rxClients.subscribe((clients) => this.stateHandler('clients', clients));
        rxInquiries.subscribe((inquiries) => this.stateHandler('inquiries', inquiries));
    }



    tryShowClientImporter(content) {
        if (this.props.creatingClient) {
            content.push(
                //make sure windows that appear on top are assigned last
                <ClientImporter
                    stateHandler={this.stateHandler} 
                />
            );
        }
    }
    tryShowClientPane(content) {
        if (this.props.viewingClient && this.props.selectedClient !== "") {
            const client = this.state.clients.filter(e => e.id === this.props.selectedClient)[0]
            content.push(
                //make sure windows that appear on top are assigned last
                <ClientPane
                    stateHandler={this.stateHandler}

                    client = {client}

                    selectedInquiry = {this.props.selectedInquiry}
                    viewingInquiry = {this.props.viewingInquiry} 
                />
            );
        }
    }

    tryShowNavPane(content) {
        if (this.props.viewingNavigation) {
            content.push(
                <NavPane
                    stateHandler={this.stateHandler}
                    //pass clients for display
                    clients = {this.state.clients}
                    inquiries = {this.state.inquiries}

                    //pass selected client for highlighting comparison
                    selectedClient = {this.props.selectedClient} 
                    selectedInquiry = {this.props.selectedInquiry}
                />
            );
        }
    }



    
    render(){
        let content = [];
        const testInquiry = new Inquiry();
        this.tryShowNavPane(content);
        this.tryShowClientPane(content, testInquiry);
        this.tryShowClientImporter(content);

        return (
            <div className='content-pane'>
                {content}
            </div>
        )
    }
}