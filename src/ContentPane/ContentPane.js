import React from 'react';
import ReactComponent_Custom from '../CustomLibrary/ReactComponent_Custom.js';
import './ContentPane.css'
import NavPane from './Windows/NavPane/NavPane.js';
import ClientPane from './Windows/ClientPane/ClientPane.js';
import rxInquiries from '../rxInquiries.js';
import Client from './Definitions/client.js';

export class ContentPane extends ReactComponent_Custom {
    constructor(props){
        super(props);
        this.state = {
            lockCreation: false,
            inquiries: [],
        }

        //function binds
        this.customBinds();
        this.tryShowClientPane = this.tryShowClientPane.bind(this);
        this.getRelatedInquiries = this.getRelatedInquiries.bind(this);
    }

    componentDidMount(){
        rxInquiries.subscribe((inquiries) => this.stateHandler('inquiries', inquiries));
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

    getRelatedInquiries(){
        if(this.props.clients){
            const client = this.props.clients.find(client => client.id === this.props.selectedClient)
            let inquiries;
            if(client){
                const linkedInquiriesIDs = client.inquiries;
                if(linkedInquiriesIDs){
                    inquiries = this.state.inquiries.filter(inquiry => linkedInquiriesIDs.includes(inquiry.id))
                }
                return inquiries;
            }
        }
    }


    tryShowNavPane(content) {
        if (this.props.viewingNavigation) {
            content.push(
                <NavPane key="NavPane"
                    stateHandler={this.stateHandler}
                    //pass clients for display
                    clients = {this.props.clients}

                    //pass selected client for highlighting comparison
                    selectedClient = {this.props.selectedClient} 
                    selectedInquiry = {this.props.selectedInquiry}
                    relatedInquiries = {this.getRelatedInquiries()}
                />
            );
        }
    }

    tryShowClientPane(content) {

        let selectedClient = this.props.selectedClient

        if (this.props.viewingClient && selectedClient !== "") {
            const client = this.getClient()
            
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

    
    render(){
        let content = [];
        
        this.tryShowNavPane(content);
        this.tryShowClientPane(content);

        return (
            <div className='content-pane'>
                {content}
            </div>
        )
    }
}