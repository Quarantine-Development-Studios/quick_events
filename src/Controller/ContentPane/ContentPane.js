import React, {useState} from 'react';
import React_Custom from '../../CustomLibrary/ReactComponent_Custom.js';
import './ContentPane.css';
import NavPane from '../Windows/NavPane/NavPane.js';
import ClientPane from '../Windows/ClientPane/ClientPane.js';
import CalendarPane from '../Windows/CalendarPane/CalendarPane.js';

import rxInquiries from '../../firebase/rxInquiries.js';
import rxClients from '../../firebase/rxClients';
import Event from '../Windows/CalendarPane/resources/event.js'

export const ViewingContext = React.createContext(null);

const ContentPane = (props) => {
    let [client, setClient] = useState(null);
    let [clients, setClients] = useState([]);

    let [inquiry, setInquiry] = useState(null);
    let [inquiries, setInquiries] = useState([]);

    let [viewingNavigation, setViewingNavigation] = useState(true);

    let [selectedClient, setSelectedClient] = useState("");
    let [viewingClient, setViewingClient] = useState(true);

    let [selectedInquiry, setSelectedInquiry] = useState("");
    let [viewingInquiry, setViewingInquiry] = useState(true);

    let [isSubscribed, setIsSubscribed] = useState(false);




    const content = [];
                
    //subscribe to database
    if(!isSubscribed){
        console.log('Subscribing to databases in ContentPane')
        rxInquiries.subscribe((inquiries) => {
            setInquiries(inquiries)

        });
        rxClients.subscribe((clients) => setClients(clients));
        setIsSubscribed(true);
    }

    //try to show NavPane
    if (viewingNavigation) {
        content.push(
            <NavPane key="NavPane"
                viewingClient = {viewingClient}
                setViewingClient = {setViewingClient}
                clients = {clients}
                setSelectedClient = {setSelectedClient}
                selectedClient = {selectedClient} 

                inquiries = {inquiries}
                setSelectedInquiry = {setSelectedInquiry}
                selectedInquiry = {selectedInquiry}
            />
        );
    }

    //try to show ClientPane
    if (viewingClient && selectedClient !== "") {
        const client_res = React_Custom.getEntry(clients, selectedClient)

        if(client !== client_res){
            setClient(client_res);
        }

        content.push(  
            <ClientPane key="ClientPane"
                client = {client}
                clients = {clients}
                viewingClient = {viewingClient}
                selectedClient = {selectedClient}
                
                inquiries = {inquiries}
                viewingInquiry = {viewingInquiry} 
                selectedInquiry = {selectedInquiry}                    
                setSelectedInquiry = {setSelectedInquiry}
            />
        );
    } else {
        if(selectedInquiry !== ""){
            setSelectedInquiry("");
        }
        if(client !== null){
            setClient(null);
        }
    }
    
    //try to show CalendarPane

/*     if(inquiries) { //temporary
        console.log('showing CalendarPane')

        content.push(
            <CalendarPane
                selectedClient = {selectedClient}
                inquiries = {inquiries}
                client = {client}
            /> 
        )
    }  */



    return (
        <div className='content-pane'>
            {content}
        </div>
    )
    
}

export default ContentPane;