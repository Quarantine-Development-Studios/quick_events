import React from 'react';
import ReactComponent_Custom from '../../../CustomLibrary/ReactComponent_Custom.js';
import './NavPane.css';
import ClientDirectory from '../../../Directories/ClientDirectory';
import CC from '../../../CustomLibrary/Object_Custom.js';
import Client from '../../Definitions/client.js';


export default class NavPane extends ReactComponent_Custom {
    
    constructor(props){
        super(props);
        this.state = {
            rootName: 'NavPane',
            isSearching: false,
            searchQuery: '',
        }

        this.customBinds();

        this.createClient = this.createClient.bind(this);
        this.selectClient = this.selectClient(this);
        this.removeClient = this.removeClient.bind(this);
        this.SearchChange = this.SearchChange.bind(this);


        this.buttonReqs = {
            'CreateClient': new CC.ButtonReq('CreateClient', 'Create Client', this.createClient),
            'RemoveClient': new CC.ButtonReq('RemoveClient', 'Remove Client', this.removeClient),
        }
    }

    createClient(e){
        let newClient = new Client();
        this.dbInsertEntry('clients', newClient, this.selectClient);
    }

    selectClient(id){
        this.stateHandler('viewingClient', true);
        setTimeout(() => {
            this.stateHandler('selectedClient', id);
        }, 0);
    }
    
    removeClient(e){ 
        if(this.props.selectedClient !== ""){
            const selectedClient = this.props.selectedClient;
            this.stateHandler('selectedClient', "");
            this.dbRemoveEntry('clients', selectedClient);
        }
    }

    getButtons(buttonReqs){
        const rItems = [];
        let i = 0;
        for(const [key, ButtonReq] of Object.entries(buttonReqs)){
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

    SearchChange(e){
        this.stateHandler('isSearching', ((e.target.value === '') ? false : true ));
        
        setTimeout(() => {
            this.stateHandler('searchQuery', e.target.value);
        }, 0);
    }


    getSearchBar(){
        const className = this.state.rootName + '-searchbar';

        return (
            <div className={className}>
                <div className={className + "-line"}>
                    <input className={className + '-input'} id='seachbarInput' defaultValue='Search' onChange={this.SearchChange}></input>
                </div>
            </div>
        )
    }


    getContent(){
            return(
                <ClientDirectory 
                    clients = {this.props.clients}
                    selectedClient = {this.props.selectedClient}

                    
                    selectedInquiry = {this.props.selectedInquiry}
                    relatedInquiries = {this.getRelatedInquiries()}

                    stateHandler = {this.stateHandler}
                    
                    
                    isSearching = {this.state.isSearching}
                    searchQuery = {this.state.searchQuery}
                />
            )
    }


    render(){   
        return (
            <div className="App-Window navpane">
                {this.WindowControlBar("Client Directory")}
                {this.getSearchBar()}
                {this.getButtons(this.buttonReqs)}
                {this.Divider()}
                {this.getContent()}
            </div>
        )
    }
}