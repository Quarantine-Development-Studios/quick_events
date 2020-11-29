import React, { useState } from 'react';
import React_Custom, { Definitions }from '../../../CustomLibrary/ReactComponent_Custom.js';
import './NavPane.css';
import ClientDirectory from '../../../Directories/ClientDirectory';
import CC from '../../../CustomLibrary/Object_Custom.js';


const NavPane = (props) => {
    const [rootName, ] = useState('NavPane');
    let [isSearching, setIsSearching] = useState(false);
    let [searchQuery, setSearchQuery] = useState('');


    const selectClient = (id) => {
        props.setViewingClient(true);
        props.setSelectedClient(id);
    }

    const createClient = (e) => {
        let newClient = new Definitions.Client();
        React_Custom.dbInsertEntry('clients', newClient, selectClient);
    }
    
    const removeClient = (e) => { 
        if(props.selectedClient !== ""){
            console.log('attempting to remove Client')

            const client = React_Custom.getEntry(props.clients, props.selectedClient)
            if(client.inquiries){
                for(let i = 0; i < client.inquiries.length; i++){
                    console.log('removing inquiry: ' + client.inquiries[i])
                    React_Custom.dbRemoveEntry('inquiries', client.inquiries[i])
                }
            }

            const selectedClientCache = props.selectedClient;
            props.setSelectedClient("");
            React_Custom.dbRemoveEntry('clients', selectedClientCache);
        }
    }

    const SearchChange = (e) => {
        setIsSearching((e.target.value === '') ? false : true );
        setSearchQuery(e.target.value);
    }

    const getSearchBar = () => {
        const className = rootName + '-searchbar';

        return (
            <div className={className}>
                <div className={className + "-line"}>
                    <input className={className + '-input'} id='seachbarInput' defaultValue='Search' onChange={SearchChange}></input>
                </div>
            </div>
        )
    }

    const getButtons = (buttonReqs) =>{
        const rItems = [];
        let i = 0;
        for(const [key, ButtonReq] of Object.entries(buttonReqs)){
            const btn = React_Custom.ReactButton(ButtonReq, rootName, rootName + '-button-' + i);
            rItems.push(btn)
            i++;
        }

        return (
            <div className="App-header-menu">
                {rItems}
            </div>   
        );
    }

    const getContent = () => {
        return(
            <ClientDirectory 
                clients = {props.clients}
                setSelectedClient = {props.setSelectedClient}
                selectedClient = {props.selectedClient}

                inquiries = {props.inquiries}
                setSelectedInquiry = {props.setSelectedInquiry}
                selectedInquiry = {props.selectedInquiry}
                
                
                isSearching = {isSearching}
                searchQuery = {searchQuery}
            />
        )
    }

    const buttonReqs = {
        'CreateClient': new CC.ButtonReq('CreateClient', 'Create Client', createClient),
        'RemoveClient': new CC.ButtonReq('RemoveClient', 'Remove Client', removeClient),
    }
  
    return (
        <div className="App-Window NavPane">
            {React_Custom.WindowControlBar("Client Directory")}
            <div className="NavPane-header">
                {getSearchBar()}
                {getButtons(buttonReqs)}
            </div>
            {React_Custom.Divider()}
            {getContent()}
        </div>
    )

}

export default NavPane;