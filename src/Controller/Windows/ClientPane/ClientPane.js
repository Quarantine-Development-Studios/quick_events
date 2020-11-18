import React from 'react';
import ReactComponent_Custom from '../../../CustomLibrary/ReactComponent_Custom.js';
import './ClientPane.css';
import Inquiry from '../../Definitions/Inquiry.js';
import CC from '../../../CustomLibrary/Object_Custom.js';
import InquiryDisp from './InquiryDisp.js';


export default class ClientPane extends ReactComponent_Custom{
    constructor(props){
        super(props);
        this.state = {
            editable: true,
        }   

        //bind functions
        this.customBinds();
        this.createInquiry = this.createInquiry.bind(this);
        this.removeInquiry = this.removeInquiry.bind(this);
        this.linkInquiry = this.linkInquiry.bind(this);

        this.getButtons = this.getButtons.bind(this);

        this.buttonReqs = {
            'CreateInquiry': new CC.ButtonReq('CreateInquiry', 'Create Inquiry', this.createInquiry),
            'RemoveInquiry': new CC.ButtonReq('RemoveInquiry', 'Remove Inquiry', this.removeInquiry)
        }
    }

    //#region Inquiry Handling
    createInquiry(e){
        if(this.props.selectedClient !== ''){
            let newInquiry = Inquiry.createInquiryByClient(this.props.client);
            this.dbInsertEntry('inquiries', newInquiry, this.linkInquiry)
        }
    }

    removeInquiry(e){
        if(this.props.selectedInquiry !== ''){
            const inquiryID = this.props.selectedInquiry;
            const clientID = this.props.client.id;
            console.log(this.props.client)
            
            let linkedInquiries = this.props.client.inquiries;
            let newLinkedInquiries = [];

            for(let i = 0; i < linkedInquiries.length; i++){
                if(linkedInquiries[i] !== inquiryID){ 
                    newLinkedInquiries.push(linkedInquiries[i]);
                }
            }

            console.log(newLinkedInquiries)
            
            //unlink from client
            this.dbSetValue('clients', clientID, 'inquiries', newLinkedInquiries);

            //remove from inquiries collection
            this.dbRemoveEntry('inquiries', inquiryID);
            this.stateHandler('selectedInquiry', '');
        }
    }

    linkInquiry(id){
        if(this.props.selectedClient !== ''){
            const client = this.props.client;
            let newArray = (client.inquiries) ? client.inquiries : [];
            //push id to array
            newArray.push(id);
            //insert into db
            this.dbSetValue('clients', client.id, 'inquiries', newArray);
            //select the inquiry to auto display it
            this.stateHandler('selectedInquiry', id);
        }
    }
    //#endregion

    getButtons(buttonReqs){
        const rItems = [];
        let i = 0;
        for(const [ , ButtonReq] of Object.entries(buttonReqs)){
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

    getDisplayContents(){
        console.log('trying to get Display Contents')
        if(this.props.viewingInquiry && this.props.inquiries && this.getInquiry()){
            return (
                <InquiryDisp 
                    inquiry = {this.getInquiry()}

                    selectedClient = {this.props.selectedClient}
                    selectedInquiry = {this.props.selectedInquiry}
                    
                />
            ) 
        } else {
            return (<div></div>);
        }
    }

    render() {
        //TODO: add test to insert blank inquiry as linked to current Client when activated
        const client = this.props.client;
        if(client !== undefined){
            return (
                <div className="ClientPane App-Window">
                    {this.WindowControlBar("Client Information")}   
                    <div className="ClientPane-content">
                        {this.InfoField('Name', 'ClientPane', client['name'], this.setValue, 'client')}
                        {this.InfoField('Email', 'ClientPane', client['email'], this.setValue, 'client')}
                        {this.InfoField('Phone', 'ClientPane', client['phone'], this.setValue, 'client')}
                        {this.getButtons(this.buttonReqs)}
                    </div>
    
                    {this.Divider()}
                    {this.getDisplayContents()}
                </div>
            )
        } else {
            <div className="ClientPane App-Window">

            </div>  
        }
    }
}