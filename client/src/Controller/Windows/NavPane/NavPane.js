import React, { useState } from 'react';
import qds_Custom, { Definitions, ReactField }from '../../resources/qds_Library/qds_custom.js';
import './NavPane.css';
import CC from '../../resources/qds_Library/qds_deps.js';
import axios from 'axios';

//views
import ClientDirectoryView from './views/clientDirectoryView.js'; //default view
import FollowUpView from './views/followUpView.js'; //options view



const NavPane = (props) => {
    const [rootName, ] = useState('NavPane');
    let [isSearching, setIsSearching] = useState(false);
    let [searchQuery, setSearchQuery] = useState('');


    const selectClient = (id) => {
        props.setViewingClient(true);
        props.setSelectedClient(id);
    }

    /**
     * Use to Create New Client entries in database
     * integrated and working
     * @param {*} e 
     */
    const createClient = (e) => {
        let newClient = new Definitions.Client();
        //qds_Custom.dbInsertEntry('clients', newClient, selectClient);

        axios.get('/api/v1/firebase-createEntry', { params: {dbId: 'clients', entry: newClient}}).then((res) => {
            const response = res.data;
            console.log(response)

            selectClient(response.id)
        })
    }
    
    /**
     * Use to Remove Clients from database
     * Needs confirmation prompt
     * @param {*} e 
     */
    const removeClient = (e) => { 
        if(props.selectedClient !== ""){
            if(window.confirm("Are You Sure You Would Like to Remove Client? \n This Will Also Remove Any Related Inquiries!")){
                console.log('attempting to remove Client')

                const client = qds_Custom.getEntry(props.clients, props.selectedClient)
                if(client.inquiries){
                    for(let i = 0; i < client.inquiries.length; i++){

                        axios.get('api/v1/firebase-removeEntry', { 
                            params: {
                                dbId: 'clients', 
                                entryId: client.inquiries[i]
                            }
                        });
                    }
                }

                const selectedClientCache = props.selectedClient;
                props.setSelectedClient("");
                axios.get('api/v1/firebase-removeEntry', { 
                    params: {
                        dbId: 'clients', 
                        entryId: selectedClientCache
                    }
                });
            }
        }
    }

    const SearchChange = (e) => {
        setIsSearching((e.target.value === '') ? false : true );
        setSearchQuery(e.target.value);
    }

    const getControlBar = () => {
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
            const btn = qds_Custom.ReactButton(ButtonReq, rootName, rootName + '-button-' + i);
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
        if(props.view === "FollowUps"){
            return (
                <FollowUpView 
                
                />
            )
        } else {
            //default view for NavPane
            return(
                <ClientDirectoryView 
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
    }

    const showViewSelectHeader = () => {
        const resourceArray = [
            {
                label: 'Clients',
                resourceId: '1'
            },
            {
                label: 'Follow Ups',
                resourceId: '2'
            }

        ];
        const inputType = 'dropDown' 

        const updateView = (e) => {
            const selectedIndex = e.target.selectedIndex;
            const fieldKey = e.target.attributes.callbackpointer.value;
            const value = e.target[selectedIndex].attributes.callbackpointer.value;

        }

        return (
            <ReactField 
                rootName={rootName}
                labelText={'View'}
                inputType={'DropDown'}
                selectionResource={resourceArray}
                onDropDownSubmit={updateView}
            />
        )
    }


    const buttonReqs = {
        'CreateClient': new CC.ButtonReq('CreateClient', 'Create Client', createClient),
        'RemoveClient': new CC.ButtonReq('RemoveClient', 'Remove Client', removeClient),
    }
  
    return (
        <div className="App-Window NavPane">
            {qds_Custom.WindowControlBar("Navigation")}
            
            {qds_Custom.Divider()}

            <div className="NavPane-header -AppContent">
                {getControlBar()}
                {getButtons(buttonReqs)}
                {showViewSelectHeader()}
            </div>

            {qds_Custom.Divider()}

            {getContent()}
        </div>
    )

}

export default NavPane;