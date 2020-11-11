import React from 'react';
import ReactComponent_Custom from '../ReactComponent_Custom.js';
import './ContentPane.css'
import rxClients from '../rxClients';
import ClientImporter from './Windows/ClientImporter';
import Inquiry from './Definitions/Inquiry.js';
import NavPane from './Windows/NavPane/NavPane.js';
import ClientPane from './Windows/ClientPane/ClientPane.js';
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
        this.tryShowClientPane = this.tryShowClientPane.bind(this);
        this.getRelatedInquiries = this.getRelatedInquiries.bind(this);
    }

    componentDidMount(){
        rxClients.subscribe((clients) => this.stateHandler('clients', clients));
        rxInquiries.subscribe((inquiries) => this.stateHandler('inquiries', inquiries));
    }



    tryShowClientImporter(content) {
        if (this.props.creatingClient) {
            content.push(
                //make sure windows that appear on top are assigned last
                <ClientImporter key="ClientImporter"
                    stateHandler={this.stateHandler} 
                />
            );
        }
    }

    getSelectedInquiry(){
        if(this.props.selectedClient !== '' && this.props.viewingInquiry){
            const inquiry = this.state.inquiries.filter(e => e.id === this.props.selectedInquiry) 
                //should return array of 1 value so we return first input in array
            if(inquiry && inquiry[0]){
                return inquiry[0];
            }
        }

        return undefined;
    }

    tryShowClientPane(content) {
        if (this.props.viewingClient && this.props.selectedClient !== "") {
            const client = this.state.clients.filter(e => e.id === this.props.selectedClient)[0]
            content.push(
                //make sure windows that appear on top are assigned last
                <ClientPane key="ClientPane"
                    stateHandler={this.stateHandler}

                    client = {client}
                    selectedClient = {this.props.selectedClient}

                    viewingInquiry = {this.props.viewingInquiry} 
                    selectedInquiry = {this.props.selectedInquiry}
                    inquiry = {this.getSelectedInquiry()}
                />
            );
        } else {
            if(this.props.selectedInquiry !== ""){
                this.stateHandler('selectedInquiry', "")
            }
        }
    }

    getRelatedInquiries(){
        const client = this.state.clients.find(client => client.id === this.props.selectedClient)
        let inquiries;
        if(client){
            const linkedInquiriesIDs = client.inquiries;
            if(linkedInquiriesIDs){
            inquiries = this.state.inquiries.filter(inquiry => linkedInquiriesIDs.includes(inquiry.id))
            }
            return inquiries;
        }
    }


    tryShowNavPane(content) {
        if (this.props.viewingNavigation) {
            content.push(
                <NavPane key="NavPane"
                    stateHandler={this.stateHandler}
                    //pass clients for display
                    clients = {this.state.clients}

                    //pass selected client for highlighting comparison
                    selectedClient = {this.props.selectedClient} 
                    selectedInquiry = {this.props.selectedInquiry}
                    relatedInquiries = {this.getRelatedInquiries()}
                />
            );
        }
    }



    
    render(){
        let content = [];
        this.tryShowNavPane(content);
        this.tryShowClientPane(content);
        this.tryShowClientImporter(content);

        return (
            <div className='content-pane'>
                {content}
            </div>
        )
    }
}