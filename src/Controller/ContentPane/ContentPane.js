import React, {useState, useEffect} from 'react';
import qds_Custom from '../resources/qds_Library/qds_custom.js';
import './ContentPane.css';
import NavPane from '../Windows/NavPane/NavPane.js';
import ClientPane from '../Windows/ClientPane/ClientPane.js';
import CalendarPane from '../Windows/CalendarPane/CalendarPane.js';

import rxInquiries from '../resources/firebase/rxInquiries.js';
import rxClients from '../resources/firebase/rxClients';

export const ViewingContext = React.createContext(null);


/**
 * ContentPane:
 * Container for All Custom Windows
 * 
 * @param {*} props 
 * @prop {bool} isLoggedIn //returns true if user has authenticated
 */
const ContentPane = (props) => {
    let [client, setClient] = useState(null);
    let [clients, setClients] = useState([]);
    let [selectedClient, setSelectedClient] = useState("");
    let [viewingClient, setViewingClient] = useState(true);

    let [inquiries, setInquiries] = useState([]);
    let [selectedInquiry, setSelectedInquiry] = useState("");
    let [viewingInquiry, setViewingInquiry] = useState(true);


    let [viewingNavigation, setViewingNavigation] = useState(true);
    let [viewingFollowUps, setViewingFollowUps] = useState(true);

                
    //subscribe inquiries and clients to database
    useEffect(() => {
        console.log('Subscribing to databases')
        rxInquiries.subscribe((inquiries) => {
            setInquiries(inquiries)

        });
        rxClients.subscribe((clients) => setClients(clients));
    }, [])


    const tryShowNavPane = () => {
        if (viewingNavigation) {
            return (
                <NavPane key="NavPane"
                    view = ''
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
    }

    const tryShowClientPane = () => {
        if (viewingClient && selectedClient !== "") {
            const client_res = qds_Custom.getEntry(clients, selectedClient)

            if(client !== client_res){
                console.log('setting client in content pane')
                setClient(client_res);
            } else {
                console.log(['client:', client])
                return (  
                    <ClientPane key="ClientPane"
                        client = {client_res}
                        clients = {clients}
                        viewingClient = {viewingClient}
                        selectedClient = {selectedClient}
                        
                        inquiries = {inquiries}
                        viewingInquiry = {viewingInquiry} 
                        selectedInquiry = {selectedInquiry}                    
                        setSelectedInquiry = {setSelectedInquiry}
                    />
                );
            }
        } else {
            if(selectedInquiry !== ""){
                setSelectedInquiry("");
            }
            if(client !== null){
                setClient(null);
            }
        }
    }
    
    const tryShowCalendar = () => {
        if(inquiries && inquiries[0]) { //temporary
            return ( 
                <div className='CalendarPane App-Window'>
                    {qds_Custom.WindowControlBar("Calendar")} 
                    <CalendarPane
                        inquiries = {inquiries}
                    /> 
                </div>
            )
        }
    }





    return (
        <div className='content-pane'>
            {tryShowNavPane()}
            {tryShowClientPane()}
            {tryShowCalendar()}
        </div>
    )
}

export default ContentPane;