import React from 'react';
import ReactComponent_Custom from '../../../CustomLibrary/ReactComponent_Custom.js';
import './NavPane.css';
import firebase from '../../../firebase';
import rxClients from '../../../rxClients';
import ClientDirectory from '../../../Directories/ClientDirectory';

export default class NavPane extends ReactComponent_Custom {
    
    constructor(props){
        super(props);
        this.state = {
            rootName: 'NavPane',
            isSearching: false,
            searchQuery: '',
        }

        this.customBinds();

        this.removeClient = this.removeClient.bind(this);
        this.SearchChange = this.SearchChange.bind(this);

    }

    removeClient(e){
        
        if(this.props.selectedClient !== ""){
            this.stateHandler('selectedClient', "");
            let entry = firebase.firestore().collection('clients').doc(this.props.selectedClient); 
            entry.delete();
        }
    }

    SearchChange(e){
        this.stateHandler('isSearching', ((e.target.value === '') ? false : true ))
        setTimeout(() => {
            this.stateHandler('searchQuery', e.target.value)
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
                relatedInquiries = {this.props.relatedInquiries}

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
                {this.Divider()}
                {this.getContent()}

            </div>
        )
    }
}