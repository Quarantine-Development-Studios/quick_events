import React from 'react';
import ReactComponent_Custom from '../CustomLibrary/ReactComponent_Custom.js';
import './ContentPane.css'
import NavPane from './Windows/NavPane/NavPane.js';
import ClientPane from './Windows/ClientPane/ClientPane.js';
import rxInquiries from '../firebase/rxInquiries.js';
import rxClients from '../firebase/rxClients';

export class ContentPane extends ReactComponent_Custom {
    constructor(props){
        super(props);
        this.state = {
            lockCreation: false,
            clients: [],
            inquiries: [],

            viewingNavigation: true,

            creatingClient: false,
            selectedClient: "",
            viewingClient: true,

            creatingInquiry: false,
            selectedInquiry: "",
            viewingInquiry: true,
                        
            viewingAgreement: false,
        }

        //function binds
        this.customBinds();
        this.tryShowClientPane = this.tryShowClientPane.bind(this);
        this.getRelatedInquiries = this.getRelatedInquiries.bind(this);
    }

    componentDidMount(){
        rxInquiries.subscribe((inquiries) => this.stateHandler('inquiries', inquiries));
        rxClients.subscribe((clients) => this.stateHandler('clients', clients));
    }

    getSelectedInquiry(){
        if(this.state.selectedClient !== '' && this.state.viewingInquiry){
            const inquiry = this.state.inquiries.filter(e => e.id === this.state.selectedInquiry) 
                //should return array of 1 value so we return first input in array
            if(inquiry && inquiry[0]){
                return inquiry[0];
            }
        }

        return undefined;
    }

    


    tryShowNavPane(content) {
        if (this.state.viewingNavigation) {
            content.push(
                <NavPane key="NavPane"
                    stateHandler={this.stateHandler}
                    //pass clients for display
                    clients = {this.state.clients}

                    //pass selected client for highlighting comparison
                    selectedClient = {this.state.selectedClient} 

                    inquiries = {this.state.inquiries}
                    selectedInquiry = {this.state.selectedInquiry}
                    relatedInquiries = {this.getRelatedInquiries()}
                />
            );
        }
    }

    tryShowClientPane(content) {

        let selectedClient = this.state.selectedClient
        const client = this.getClient()

        // console.log(this.state);
        // console.log(this.state);

        if (this.state.viewingClient && selectedClient !== "" && client) {
            console.log('Content Pane 65')
            content.push(
                
                <ClientPane key="ClientPane"
                    stateHandler={this.stateHandler}

                    client = {client}

                    inquiries = {this.state.inquiries}
                    viewingInquiry = {this.state.viewingInquiry} 
                    selectedInquiry = {this.state.selectedInquiry}
                />
            );
        } else {
            if(this.state.selectedInquiry !== ""){
                this.stateHandler('selectedInquiry', "")
            }
        }
    }

    
    render(){
        let content = [];
        
        //make sure windows that appear on top are assigned last
        this.tryShowNavPane(content);
        this.tryShowClientPane(content);

        return (
            <div className='content-pane'>
                {content}
            </div>
        )
    }
}